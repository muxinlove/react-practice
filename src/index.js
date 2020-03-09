/**
 * react 核心api
 * createElement 创建vnode
 * Component 实现自定义组件 class组件继承 才有的setState forceUpdate...
 * render vnode->node 将其更新渲染到container中
 */

// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact/index.js';
import ReactDOM from './kreact/k-react-dom.js';
import './index.css';


const FunctionComponent = ({ name }) => {
  return <div className="border">
    <p>funciton name:{name}</p>
    <button onClick={() => console.log('function component clicked')}>click</button>
  </div>
}

class ClassComponent extends React.Component {
  render() {
    const { name } = this.props;
    return <div className="border">class name:{name}</div>
  }
}

const jsx = <div className="border">
  <p>我这一段文本</p>
  <a href="https://kaikaiba.com">开课吧</a>
  <div className="border">
    <span>我是border中的文本</span>
  </div>
  <FunctionComponent name='函数组件' />
  <ClassComponent name='class组件' />
  <>
    <p>文本1</p>
    <p>文本2</p>
  </>
  <React.Fragment>
    <p>文本3</p>
  </React.Fragment>
  {
    [1, 2].map(item => {
      return <div className="border">
        {item}
      </div>
    })
  }
</div>

ReactDOM.render(jsx, document.getElementById('root'));

// ！节点类型
// 文本节点
// html元素节点
// functional组件
// class 组件
// fragment

