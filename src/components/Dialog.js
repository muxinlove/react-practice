import React, { Component } from 'react'
import { createPortal } from 'react-dom'

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    // div node
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  render() {
    const { children } = this.props;

    return (
      createPortal(
        <div className="dialog">
          <h3>Dialog</h3>
          {
            children
          }
        </div>,
        this.node
      )
    )
  }
}
