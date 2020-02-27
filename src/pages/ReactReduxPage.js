import React, { Component } from 'react'
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
import { connect } from "../KReactRedux.js";


// 將state映射到props上 是个函数 参数 (state, [ownProps])
// ownProps 组件本身的props
// ! ！ownProps 谨慎使用 如果ownProps发生变化的话，mapStateToProps 会被重新执行 state也会被重新计算 影响性能
// const mapStateToProps = (state, ownProps) => {
//   console.log('ownProps', ownProps);
//   return { count: state };
// };

const mapStateToProps = state => ({ count: state });

// 將action creator映射到props上 Object/Function
// 1.如果不指定 则默认注入dispatch本身
// 2.对象 dispatch不会被注入
// const mapDispatchToProps = {
//   add: () => ({ type: 'ADD' })
// }
// 3.函数 可以手动传入dispatch 参数 (state, [ownProps])
// ! ！ownProps 谨慎使用 如果ownProps发生变化的话，mapDispatchToProps 会被重新执行 影响性能
const mapDispatchToProps = dispatch => ({
  dispatch,
  add: () => dispatch({ type: 'ADD' })
})

// const mapDispatchToProps = dispatch => {
//   let res = {
//     add: () => ({ type: 'ADD' })
//   }
//   res = bindActionCreators(res, dispatch);
//   return {
//     dispatch,
//     ...res
//   }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({
//   add: () => ({ type: 'ADD' })
// }, dispatch);


// connect 连接store和组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ReactReduxPage extends Component {
    render() {
      console.log('props', this.props);
      const { count, add, dispatch } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <div>{count}</div>
          <button onClick={add}>ADD</button>
          <button onClick={() => (dispatch({ type: 'ADD' }))}>use add dispatch</button>
        </div>
      )
    }
  }
)
