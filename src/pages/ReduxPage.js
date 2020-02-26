import React, { Component } from 'react'
import store from '../store/index.js'

export default class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      console.log('第一次订阅');
      this.forceUpdate();
    })

    //  测试返回值
    // this.unSubscribe = store.subscribe(() => {
    //   console.log('第二次订阅');
    //   this.forceUpdate();
    // })

  }
  add = () => {
    store.dispatch({ type: 'ADD' });
    // if (store.getState() > 2) {
    //   this.unSubscribe();
    //   console.log('取消第二次订阅');
    // }
  }

  asyncAdd = () => {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: 'ADD' })
      }, 2000);
    })
  }

  render() {
    const { getState, dispatch } = store;
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{getState().count}</div>
        <button onClick={this.add}>add</button>
        <button onClick={() => dispatch({ type: 'MINUS' })}>minus</button>
        <button onClick={this.asyncAdd}>AsyncAdd</button>
      </div>
    )
  }
}
