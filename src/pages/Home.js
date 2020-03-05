import React, { Component } from 'react'
import PageLayout from '../layout/PageLayout/PageLayout.js'
import './common.scss'

export default class Home extends Component {
  render() {
    return <PageLayout
      title='首页'
      shortIcon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1">
      <div className='page'>
        home
      </div>
    </PageLayout>
  }
}