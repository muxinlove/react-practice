import React, { Component } from 'react'
import PageLayout from '../layout/PageLayout/PageLayout.js'
import './common.scss'

export default class _404 extends Component {
  render() {
    return <PageLayout>
      <div className='page'>
        404 not found
        </div>
    </PageLayout>
  }
}