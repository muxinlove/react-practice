import React, { Component } from 'react'
import { connect } from 'react-redux'

export default connect(
  // mapStateToProps 將store中的数据映射到props中
  state => ({ num: state }),
  // mapDispatchToProps 將dispatch方法映射到props中
  {
    add: () => ({ type: 'ADD' })
  }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log('props', this.props);
      const { num, add } = this.props;
      return (
        <div>
          <h2>ReactReduxPage</h2>
          <div>{num}</div>
          <button onClick={add}>ADD</button>
        </div>
      )
    }
  }
)
