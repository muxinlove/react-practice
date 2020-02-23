import React, { Component } from 'react'
import { store } from "../store/index";

export class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      console.log('state发生变化');
      this.forceUpdate();
    })
  }
  add() {
    store.dispatch({ type: 'ADD' })
  }
  render() {
    console.log(store);
    return (
      <div>
        <h2>Index Page</h2>
        <div>{store.getState()}</div>
        <button onClick={this.add}>ADD</button>
      </div>
    )
  }
}

export default ReduxPage
