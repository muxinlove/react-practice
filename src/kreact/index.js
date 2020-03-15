function createElement(type, props, ...children) {
  if (props) {
    delete props.__source;
    delete props.__self;
  }

  return {
    type: type,
    props: {
      ...props,
      // 统一处理为数组
      children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
    }
  }
}

function createTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  }
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
}

export default {
  createElement,
  Component,
}