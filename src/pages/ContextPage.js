import React, { Component } from 'react'
import ContextTypePage from './ContextTypePage.js'
import ConsumerPage from './ConsumerPage.js'
import MultipleContextPage from './MultipleContextPage.js'

import { ThemeProvider } from '../ThemeContext.js'
import { UserProvider } from '../UserContext.js'

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: 'red'
      },
      user: {
        name: 'xxx'
      }
    }
  }

  changeColor = () => {
    const { themeColor } = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === 'red' ? 'green' : 'red'
      }
    })
  }

  render() {
    const { theme, user } = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change</button>
        <ThemeProvider value={theme}>
          <ContextTypePage />
          <ConsumerPage />

          <UserProvider value={user}>
            <MultipleContextPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    )
  }
}
