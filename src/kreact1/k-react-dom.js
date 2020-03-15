import { PLACEMENT, UPDATE, DELETIONS } from './CONST.js'

// 下一个子任务
let nextUnitOfWork = null;
//  workInProgress 工作中的fiber root
let workInProgressRoot = null;
// 现在的根节点
let currentRoot = null;

// 当前正在工作的fiber
let wipFiber = null;
let hookIndex = null;

// 存储需要删除fiber的数组 统一提交 之后需要置空
let deletions = null;


function render(vnode, container) {
  workInProgressRoot = {
    type: vnode.type,
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  }
  nextUnitOfWork = workInProgressRoot;
  deletions = [];
}

function createNode(fiber) {
  const { type, props } = fiber;
  let node;
  if (type === 'TEXT') {
    node = document.createTextNode('');
  } else if (type) {
    node = document.createElement(type);
  }
  // 更新属性
  updateNode(node, {}, props);
  return node;
}

function reconcileChildrem(workInProgressFiber, children) {
  // 构建fiber
  let prevSibing = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  children.forEach((child, index) => {
    let newFiber = null;
    const sameType = child && oldFiber && child.type === oldFiber.type;

    // 复用
    if (sameType) {
      newFiber = {
        // 类型 区分不同的fiber class functional host
        type: oldFiber.type,
        // 属性参数等
        props: child.props,
        // 真实dom节点
        node: oldFiber.node,
        // 存储fiber 便于比较
        base: oldFiber,
        // 父fiber
        parent: workInProgressFiber,
        // 标记
        effectTag: UPDATE
      }
    }

    // 新增
    if (!sameType && child) {
      newFiber = {
        // 类型 区分不同的fiber class functional host
        type: child.type,
        // 属性参数等
        props: child.props,
        // 真实dom节点
        node: null,
        // 存储fiber 便于比较
        base: null,
        // 父fiber
        parent: workInProgressFiber,
        // 标记
        effectTag: PLACEMENT
      }
    }

    // 删除
    if (!sameType && oldFiber) {
      oldFiber.effectTag = DELETIONS;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibing;
    }


    if (index === 0) {
      // child
      workInProgressFiber.child = newFiber
    } else {
      // sibing
      prevSibing.sibing = newFiber;
    }
    prevSibing = newFiber;
  })
}

function updateNode(node, prevValue, nextValue) {
  Object.keys(prevValue)
    .filter(key => key !== 'children')
    .filter(key => !(key in nextValue))
    .forEach(key => {
      // 简单判断是否是事件
      if (key.slice(0, 2) === 'on') {
        const eventName = key.slice(2).toLowerCase();
        node.removeEventListener(eventName, prevValue[key]);
      } else {
        node[key] = '';
      }
    })

  //  过滤掉children外的其他属性加到node上
  Object.keys(nextValue)
    .filter(key => key !== 'children')
    .forEach(key => {
      // 简单判断是否是事件
      if (key.slice(0, 2) === 'on') {
        const eventName = key.slice(2).toLowerCase();
        node.addEventListener(eventName, nextValue[key]);
      } else {
        node[key] = nextValue[key]
      }
    })
}


function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  hookIndex = 0;

  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildrem(fiber, children);
}
function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const component = new type(props);
  const children = [component.render()];
  reconcileChildrem(fiber, children);
}

function updateHostComponent(fiber) {
  //创建node
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const { children } = fiber.props;
  reconcileChildrem(fiber, children);
}

function updateFragmentComponent(fiber) {
  const { children } = fiber.props;
  reconcileChildrem(fiber, children);
}

function performUnitOfWork(fiber) {
  // 执行当前子任务
  // 判断类型
  const { type } = fiber;
  if (typeof type === 'function') {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else if (type) {
    updateHostComponent(fiber);
  } else {
    updateFragmentComponent(fiber);
  }


  // 返回下一个子任务
  // 找到下一个子任务原则：深度优先
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子元素 寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibing) {
      return nextFiber.sibing;
    }
    nextFiber = nextFiber.parent;
  }
  // 循环都没有找到的话 默认return undefined
}


function workLoop(IdleDeadline) {
  // 执行子任务
  // 返回下一个子任务
  // IdleDeadline.timeRemaining 返回当前空余时间还剩下多少（毫秒数）
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 有下一个子任务 并且 当前帧还没有结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  //...
  // 如果没有子任务了 
  if (!nextUnitOfWork && workInProgressRoot) {
    // 提交
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

function commitRoot() {
  deletions.forEach(commitWorker);
  commitWorker(workInProgressRoot.child);
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找父节点
  let parentNodeFiber = fiber.parent;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent;
  }
  const parentNode = parentNodeFiber.node;

  // 新增 更新 删除
  if (fiber.effectTag === PLACEMENT && fiber.node) {
    parentNode.appendChild(fiber.node);
  }
  if (fiber.effectTag === UPDATE && fiber.node) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
  }
  if (fiber.effectTag === DELETIONS && fiber.node) {
    commitDeletions(fiber, parentNode);
  }
  // 递归
  commitWorker(fiber.child);
  commitWorker(fiber.sibing);
}

function commitDeletions(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    commitDeletions(fiber.child, parentNode);
  }
}

// 调用时机:浏览器空余时间调用
requestIdleCallback(workLoop);


// hook useState 
export function useState(init) {
  // 新旧hook
  let oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  let hook = {
    state: oldHook ? oldHook.state : init,
    queue: oldHook ? oldHook.queue : []
  }
  hook.queue.forEach(action => {
    hook.state = action;
  })
  const setState = action => {
    hook.queue.push(action);

    workInProgressRoot = {
      type: currentRoot.type,
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitOfWork = workInProgressRoot;
    deletions = [];
  }

  wipFiber.hooks.push(hook);
  hookIndex++;

  return [hook.state, setState];
}

export default {
  render
}