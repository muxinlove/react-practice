import React, { Component } from 'react'
import { ThemeContext, ThemeConsumer } from '../ThemeContext.js'

/**
 * contextType 只能订阅一个context 并且 只能是class组件
 * 
 * consumer 可以在class组件和function组件中使用 使用更广泛 中间包含一个函数 参数是context
 */

export default class ContextTypePage extends Component {
  // contextType 只能订阅一个context 并且只能是class组件
  static contextType = ThemeContext;
  render() {
    console.log('this', this);
    const { themeColor } = this.context;

    return (
      <div>
        <h3 >ContextTypePage</h3>
        <div className="border">
          <span className={themeColor}>文本</span>
        </div>
        <div className="greenBorder">
          <ThemeConsumer>
            {
              context => (<span className={context.themeColor}>文本</span>)
            }
          </ThemeConsumer>
        </div>
      </div>
    )
  }
}
