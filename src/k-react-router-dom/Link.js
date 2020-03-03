import React, { Component } from 'react'
import { RouterContext } from './RouterContext.js'

export default class Link extends Component {
  handlerClick = (e, history) => {
    e.preventDefault();
    history.push(this.props.to);
  }
  render() {
    const { to, children } = this.props;
    return (
      <RouterContext.Consumer>
        {
          context => {
            return <a href={to} onClick={(event) => this.handlerClick(event, context.history)}>{children}</a>
          }
        }
      </RouterContext.Consumer>

    )
  }
}
