import React, { Component } from 'react'
import PageLayout from '../layout/PageLayout/PageLayout.js'
import { connect } from 'react-redux'
import './common.scss'

const mapStateToProps = state => {
  return {
    isLogin: state.base.isLogin
  }
}

const mapDispatchToProps = {
  logout: () => ({ type: 'LOGOUT' })
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class Personal extends Component {
    render() {
      const { isLogin, logout } = this.props;
      return <PageLayout>
        <div className='page'>
          Personal
         {
            isLogin && <div>
              <button onClick={logout}>logout</button>
            </div>
          }
        </div>
      </PageLayout>
    }
  }
)
