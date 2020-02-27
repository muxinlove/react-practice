import React, { Component, createContext } from 'react'

const ValueContext = createContext();
const ValueProvider = ValueContext.Provider;

export const connect = () => WrapperedComponent => {
  return class extends Component {
    static contextType = ValueContext;
    render() {
      console.log('this.context', this.context);

      return (
        <WrapperedComponent />
      )
    }
  }
}

export class Provider extends Component {
  render() {
    const { store } = this.props;
    return (
      <ValueProvider value={store}>
        {this.props.children}
      </ValueProvider>
    )
  }
}
