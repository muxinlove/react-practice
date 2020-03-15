import { PLACEMENT, UPDATE, DELETIONS } from './CONST.js'
// 初始化定义
// 下一个子任务
let nextUnitOfWork = null;
// 工作中的fiber root
let wipRoot = null;
// 存储当前的根fiber到base上
let currentRoot = null;

let deletions = null;

// 当前工作的fiber
let wipFiber = null;
let hookIndex = null;

function render(vnode, container) {
  // // vnode->node
  // const node = createNode(vnode);
  // // 挂载
  // container.appendChild(node);

  wipRoot = {
    type: vnode.type,
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  }
  nextUnitOfWork = wipRoot

  deletions = [];
}

function createNode(fiber) {
  const { type, props } = fiber;
  let node = null;
  if (type === 'TEXT') {
    node = document.createTextNode('');
  } else {
    node = document.createElement(type);
  }
  // 节点新增props
  updateNode(node, {}, props);
  return node;
}


function updateNode(node, prevValue, nextValue) {
  Object.keys(prevValue)
    .filter(k => k !== 'children')
    .filter(key => !(key in nextValue))
    .forEach(k => {
      // on开头为事件
      const isEvent = k.slice(0, 2) === 'on';
      if (isEvent) {
        const eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, prevValue[k]);
      } else {
        node[k] = '';
      }
    })

  Object.keys(nextValue)
    .filter(k => k !== 'children')
    .forEach(k => {
      // on开头为事件
      const isEvent = k.slice(0, 2) === 'on';
      if (isEvent) {
        const eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextValue[k]);
      } else {
        node[k] = nextValue[k];
      }
    })
}

// fiber实现 浏览器空余时间会去调用
requestIdleCallback(workLoop);

// 工作流
function workLoop(IdleDeadline) {
  // 判断是否有子任务
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 有下一个子任务 并且当前帧还没有结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 如果没有子任务则提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  // 再次调用
  requestIdleCallback(workLoop);
}

function commitRoot() {
  deletions.forEach(commitWorker)
  // 將根的child提交
  commitWorker(wipRoot.child);
  // 保存Root的base
  currentRoot = wipRoot;
  // 置空 则workLoop不进入
  wipRoot = null;
}


function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  // 向上查找父节点
  let parentFiber = fiber.parent;
  while (!parentFiber.node) {
    parentFiber = parentFiber.parent;
  }
  const parentNode = parentFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node) {
    parentNode.appendChild(fiber.node);
  }

  if (fiber.effectTag === UPDATE && fiber.node) {
    updateNode(fiber.node, fiber.base.props, fiber.props)
  }

  if (fiber.effectTag === DELETIONS && fiber.node) {
    commitDeletions(fiber, parentNode)
  }

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

function performUnitOfWork(fiber) {
  // 执行子任务
  const { type } = fiber;
  if (typeof type === 'function') {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 返回下一个子任务
  // 寻找下一个子任务 深度优先
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibing) {
      return nextFiber.sibing
    }
    nextFiber = nextFiber.parent;
  }
  // 如果什么都没有 返回undefined
}

function updateHostComponent(fiber) {
  // 构建fiber
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  const { children } = fiber.props;
  reconcileChildren(fiber, children)
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  hookIndex = 0;

  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children)
}

function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const component = new type(props);
  const children = [component.render()];
  reconcileChildren(fiber, children)
}

function reconcileChildren(workInProgressFiber, children) {
  // 保存上一个兄弟
  let prevSibing = null;
  // 协调 新旧对比 这里只比对type 没有移位或者其他操作
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  children.forEach((child, index) => {
    // 新增
    let newFiber = null;

    const sameType = child && oldFiber && child.type === oldFiber.type;

    // 更新
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber, // 存储上次fiber 便于比较
        parent: workInProgressFiber,
        effectTag: UPDATE,
      }
    }

    // 新增
    if (!sameType && child) {
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null, // 存储上次fiber 便于比较
        parent: workInProgressFiber,
        effectTag: PLACEMENT
      }
    }

    // 删除
    if (!sameType && oldFiber) {
      oldFiber.effectTag = DELETIONS;
      deletions.push(oldFiber);
    }


    // 闭包 在外面定义 内部使用
    if (oldFiber) {
      oldFiber = oldFiber.sibing;
    }

    // 定义child sibing
    if (index === 0) {
      workInProgressFiber.child = newFiber
    } else {
      prevSibing.sibing = newFiber
    }
    prevSibing = newFiber
  })
}


export function useState(init) {
  let oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  let hook = {
    state: oldHook ? oldHook.state : init,
    queue: oldHook ? oldHook.queue : []
  }

  hook.queue.forEach(action => hook.state = action);

  const setState = action => {
    hook.queue.push(action);

    // 给nextUnitOfWork值 启动workLoop
    wipRoot = {
      type: currentRoot.type,
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitOfWork = wipRoot;
    deletions = [];
  }

  wipFiber.hooks.push(hook);
  hookIndex++;

  return [hook.state, setState];
}

export default {
  render
}