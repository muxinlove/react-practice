import React, { Component } from 'react'

// 高阶组件：是一个函数 接收一个组件 返回一个新组件
// function Child() {
//   return (<div>Child</div>)
// }

const foo = Comp => props => {
  return (
    <div className="border">
      <Comp {...props} />
    </div>
  )
}

const foo2 = Comp => props => {
  return (
    <div className="greenBorder">
      <Comp {...props} />
    </div>
  )
}


// const Foo = foo2(foo(foo(Child)));

@foo2
@foo
@foo
class Child extends Component {
  render() {
    return (
      <div>
        Child
      </div>
    )
  }
}



export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo /> */}
        <Child />
      </div>
    )
  }
}
