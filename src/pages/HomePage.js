import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    console.log('home', this.props);

    return (
      <div>
        <h3>HomePage</h3>
      </div>
    )
  }
}
