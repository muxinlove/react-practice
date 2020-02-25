import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

export default class FormPage extends Component {
  submit = () => {

  }

  render() {
    return (
      <div>
        <h3>FormPage</h3>
        <Form>
          <Form.Item>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item>
            <Input type='password' placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={this.submit}>登陆</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
