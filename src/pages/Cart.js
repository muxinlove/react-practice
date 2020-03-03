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
  showLogin: () => ({ type: 'SHOWLOGIN' })
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Cart extends Component {
    render() {
      const { isLogin, showLogin } = this.props;
      return <PageLayout>
        <div className='page'>
          Cart
          {
            !isLogin && <div>
              <button onClick={showLogin}>login</button>
            </div>
          }
        </div>
      </PageLayout>
    }
  }
)
