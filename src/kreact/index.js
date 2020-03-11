function createElement(type, props, ...children) {
  if (props) {
    delete props.__source;
    delete props.__self;
  }

  // Resolve default props
  // if (type && type.defaultProps) {
  //   const defaultProps = type.defaultProps;
  //   for (let propName in defaultProps) {
  //     if (props[propName] === undefined) {
  //       props[propName] = defaultProps[propName];
  //     }
  //   }
  // }

  let defaultProps = {};
  if (type && type.defaultProps) {
    defaultProps = { ...type.defaultProps };
  }

  return {
    type: type,
    props: {
      ...defaultProps,
      ...props,
      // 统一处理为对象 源码是一个是对象 多个是数组
      children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
    }
  }
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: text
    }
  }
}

class Component {
  // 定义一些base属性和方法 lg:setState forceUpdate isReactComponent
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
}

// function Component(props) {
//   this.props = props;
// }

// Component.prototype.isReactComponent = true;




export default {
  createElement,
  Component,
  Fragment: '@KKB/FRAGMENT'
}