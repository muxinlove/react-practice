import React, { Component } from 'react'
import Footer from '../../components/Footer/Footer.js'
import Login from '../../components/Login/Login.js'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    showLogin: state.status.showLogin
  }
}

export default connect(mapStateToProps)(
  class PageLayout extends Component {
    render() {
      const { showLogin } = this.props;
      return (
        <div>
          {this.props.children}
          <Footer />
          {/* 登陆 */}
          {
            showLogin && <Login />
          }
        </div>
      )
    }
  }
)
