import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

const nameRules = { required: true, message: '请输入姓名' };
const passwordRules = { required: true, message: '请输入密码' };

@Form.create({})
class FormAntdPage extends Component {
  submit = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('提交', values);
      }
    })
  }

  render() {
    console.log('props', this.props);
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h3>FormAntdPage</h3>
        <Form>
          <Form.Item>
            {/* 双向绑定 */}
            {
              getFieldDecorator('name', { rules: [nameRules] })(
                <Input placeholder="请输入姓名" />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', { rules: [passwordRules] })(
                <Input type='password' placeholder="请输入密码" />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default FormAntdPage 
