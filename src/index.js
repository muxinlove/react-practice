/**
 * react 核心api
 * createElement 创建vnode
 * Component 实现自定义组件 class组件继承 才有的setState forceUpdate...
 * render vnode->node 将其更新渲染到container中
 */

// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './kreact/index.js';
import ReactDOM, { useState } from './kreact/k-react-dom.js';
import './index.css';


const FunctionComponent = ({ name }) => {
  const [count, setCount] = useState(0);

  const obj = count % 2 ? {
    className: 'red'
  } : {
      onClick: () => console.log('onClick')
    }

  return <div className="border">
    <p>funciton name:{name}</p>

    <div>
      <p {...obj}>oooo</p>
      {
        count % 2
          ? <button onClick={() => console.log('function component clicked')}>click</button>
          : <div className='green'>kkb</div>
      }
    </div>
    <div>
      <p>count:{count}</p>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
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
  {/*<>
    <p>文本1</p>
    <p>文本2</p>
  </> */}
</div>

ReactDOM.render(jsx, document.getElementById('root'));

// ！节点类型
// 文本节点
// html元素节点
// functional组件
// class 组件
// fragment

