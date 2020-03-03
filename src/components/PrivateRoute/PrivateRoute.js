import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    isLogin: state.base.isLogin
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showLogin: () => ({ type: 'SHOWLOGIN' })
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  class PrivateRoute extends Component {
    render() {
      const { path, component, isLogin, showLogin } = this.props;
      if (isLogin) {
        return <Route path={path} component={component} />
      } else {
        showLogin();
        return <Redirect to={{ pathname: '/home', state: { redirect: path } }} />
      }
    }
  }
)
