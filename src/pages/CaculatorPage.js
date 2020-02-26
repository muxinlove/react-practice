import React, { Component } from 'react'
import store from '../store/index.js'

export default class CaculatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: ''
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    })
  }

  handlerChange = (e) => {
    this.setState({ num: e.target.value });
  }
  add = () => {
    const { num } = this.state;
    store.dispatch({ type: 'ADD', payload: Number(num) })
  }
  minus = () => {
    const { num } = this.state;
    store.dispatch({ type: 'MINUS', payload: Number(num) })
  }
  render() {
    const { getState } = store;
    const { num } = this.state;

    return (
      <div>
        <h3>CaculatorPage</h3>
        <div>{getState().count}</div>
        <div>
          <input type="text" value={num} onChange={this.handlerChange} />
        </div>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}
