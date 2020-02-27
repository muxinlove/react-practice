import React, { Component, createContext } from 'react'

const ValueContext = createContext();
const ValueProvider = ValueContext.Provider;

export const connect = (
  mapStateToProps = () => { },
  mapDispatchToProps
) => WrapperedComponent => {
  return class extends Component {
    static contextType = ValueContext;

    constructor(props) {
      super(props);
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { subscribe } = this.context;
      this.update();
      // 监听 当state变化后 重新执行映射
      subscribe(() => {
        this.update();
      })
    }

    update = () => {
      // 映射state 和dispatch 去 props  
      const { getState, dispatch } = this.context;
      const stateProps = mapStateToProps(getState());
      // mapDispatchToProps 三种场景 不传 对象 函数
      let dispatchProps;
      if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      } else if (typeof mapDispatchToProps === 'function') {
        // ownProps  组件本身的props
        dispatchProps = mapDispatchToProps(dispatch, this.props);
      } else {
        dispatchProps = { dispatch };
      }

      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render() {
      console.log('this.context', this.context);
      const { props } = this.state;

      return (
        <WrapperedComponent {...props} />
      )
    }
  }
}

export class Provider extends Component {
  render() {
    const { store } = this.props;
    return (
      <ValueProvider value={store}>
        {this.props.children}
      </ValueProvider>
    )
  }
}

// 高阶函数 
function bindActionCreator(creator, dispatch) {
  return (...arg) => (dispatch(creator(...arg)));
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}
