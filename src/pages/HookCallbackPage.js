import React, { useState, useCallback, PureComponent } from 'react'

export default function HookPage() {
  // 定义state 和修改state的方法 = 初始化值
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const addClick = useCallback(() => {
    console.log('computed');
    let num = 0;
    for (let i = 0; i < count; i++) {
      num += i;
    }
    return num;
  }, [count]) // 依赖项 只有count变化才会重新计算

  return (
    <div>
      <h3>HookPage</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>button</button>
      <input type="text" value={value} onChange={event => setValue(event.target.value)} />
      <Child addClick={addClick} />
    </div>
  )
}

class Child extends PureComponent {
  render() {
    console.log('child render');
    const { addClick } = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>button</button>
      </div>
    )
  }
}
