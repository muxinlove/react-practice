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
    componentDidMount() {
      const {
        title = "默认",
        shortIcon = "https://store-images.s-microsoft.com/image/apps.64108.9007199266248398.f50070aa-ca14-4881-9e29-fb874435dc3d.a620dd2f-083d-4523-bdd5-d50a527956d4"
      } = this.props;
      document.title = title;
      document.getElementById("shortIcon").href = shortIcon;
    }
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
