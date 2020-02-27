import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps = ({ baseInfo }) => ({
  isLogin: baseInfo.isLogin
})
const mapDispatchToProps = {
  login: () => ({ type: 'LOGIN' })
}

class LoginPage extends Component {
  render() {
    console.log('login', this.props);

    const { isLogin, login, location } = this.props;
    const { redirect = '/' } = location.state || {};
    if (isLogin) {
      return <Redirect to={redirect} />
    } else {
      return (
        <div>
          <h3>LoginPage</h3>
          <button onClick={login}>login</button>
        </div>
      )
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);





