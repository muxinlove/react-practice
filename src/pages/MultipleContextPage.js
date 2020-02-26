import React, { Component } from 'react'
import { ThemeConsumer } from '../ThemeContext.js'
import { UserConsumer } from '../UserContext.js'

export default class MultipleContextPage extends Component {
  render() {
    return (
      <div>
        <h3>MultipleContextPage</h3>
        <div className="border">
          <ThemeConsumer>
            {
              theme => <UserConsumer>
                {
                  user => <span className={theme.themeColor}>{user.name}</span>
                }
              </UserConsumer>
            }
          </ThemeConsumer>
        </div>
      </div>
    )
  }
}
