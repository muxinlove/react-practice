import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import './login.scss'
import { connect } from 'react-redux'

export default connect(
  () => ({}),
  {
    login: () => ({ type: 'LOGIN' }),
    hideLogin: () => ({ type: 'HIDELOGIN' }),
  }
)(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.node = window.document.createElement('div');
      window.document.body.appendChild(this.node);
    }

    componentWillUnmount() {
      window.document.body.removeChild(this.node);
    }

    login = () => {
      this.props.login();
      this.props.hideLogin();
    }
    render() {
      const { hideLogin } = this.props;
      return (
        createPortal(
          <div className='login-box'>
            <div className="cover" onClick={hideLogin}></div>
            <div className="box">
              <div>登陆</div>
              <div>
                <button onClick={this.login}>login</button>
              </div>
            </div>
          </div>,
          this.node
        )
      )
    }
  }
)
