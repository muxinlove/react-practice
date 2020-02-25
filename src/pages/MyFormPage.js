import React, { Component } from 'react'
import KFormCreate from "../components/KFormCreate.js";

const nameRules = { required: true, message: '请输入姓名' };
const passwordRules = { required: true, message: '请输入密码' };

@KFormCreate
class MyFormPage extends Component {
  submit = () => {
    const { getFieldsValue, getFieldValue, validateFields } = this.props.form;

    console.log('submit', getFieldsValue(), getFieldValue('name'));

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
        <h3>MyFormPage</h3>
        <div>
          {
            getFieldDecorator('name', { rules: [nameRules] })(<input type="text" placeholder="请输入姓名" />)
          }
        </div>
        <div>
          {
            getFieldDecorator('password', { rules: [passwordRules] })(<input type="password" placeholder="请输入密码" />)
          }
        </div>
        <div>
          <button onClick={this.submit}>提交</button>
        </div>
      </div>
    )
  }
}
export default MyFormPage;
