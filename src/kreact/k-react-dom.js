function render(vnode, container) {
  // console.log('vnode', vnode);

  // vnode->node
  const node = createNode(vnode);
  // 更新渲染container
  container.appendChild(node);
}

function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  //  判断vnode类型
  if (typeof type === 'function') {
    node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
  } else if (type === 'TEXT') {
    node = document.createTextNode('');
  } else if (type === '@KKB/FRAGMENT') {
    node = document.createDocumentFragment();
  } else if (type) {
    node = document.createElement(type);
  } else {
    // 创建fragment
    node = document.createDocumentFragment();
  }

  // 更新属性
  updateNode(node, props);

  // 递归处理children
  if (props.children.length) {
    reconcileChildrem(props.children, node);
  }
  return node;
}

function reconcileChildrem(children, container) {
  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(childItem => render(childItem, container))
    } else {
      render(child, container);
    }
  })
}

function updateNode(node, nextValue) {
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

function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  return createNode(vvnode);
}
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const component = new type(props);
  const vvnode = component.render();
  return createNode(vvnode);
}

export default {
  render
}