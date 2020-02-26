import React from 'react'
import { ThemeConsumer } from '../ThemeContext.js'

export default function ConsumerPage() {
  return (
    <div>
      <h3>ConsumerPage</h3>
      <div className="border">
        <ThemeConsumer>
          {
            context => (<span className={context.themeColor}>文本</span>)
          }
        </ThemeConsumer>
      </div>
    </div>
  )
}
