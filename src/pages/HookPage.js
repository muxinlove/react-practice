import React, { useState, useEffect, useMemo } from 'react'

export default function HookPage() {
  // 定义state 和修改state的方法 = 初始化值
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  // 类似于didMount didUpdate 
  useEffect(() => {
    console.log('count effect');
    document.title = `点击了${count}次`
  }, [count])

  // 计算属性
  const expensive = useMemo(() => {
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
      <div>expensive:{expensive}</div>
      <button onClick={() => setCount(count + 1)}>button</button>
      {/* <div>{useClock().toLocaleTimeString()}</div> */}
      <input type="text" value={value} onChange={event => setValue(event.target.value)} />
    </div>
  )
}


// 自定义hook
// function useClock() {
//   const [date, setDate] = useState(new Date());
//   useEffect(() => {
//     console.log('date effect');
//     const timer = setInterval(() => {
//       setDate(new Date());
//     }, 1000)
//     // 清除effect函数，类似于willUnmount 可以解除监听 清除定时器...
//     return () => clearInterval(timer);
//   }, [])
//   return date;
// }
