import React, { Component } from 'react'

// 高阶组件
const KFormCreate = Comp => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        errors: {}
      };
      this.options = {};
      this.form = {
        getFieldDecorator: this.getFieldDecorator,
        getFieldsValue: this.getFieldsValue,
        getFieldValue: this.getFieldValue,
        validateFields: this.validateFields
      }
    }

    handleChange = (e) => {
      let { name, value } = e.target;
      this.validate({
        ...this.state,
        [name]: value
      })
    }

    getFieldDecorator = (field, option) => inputComp => {
      //  初始化 保存fidld option
      this.options[field] = option;
      const { errors } = this.state;
      // 克隆一份 自定义双向绑定
      return (
        <div>
          {
            React.cloneElement(inputComp, {
              name: field,
              value: this.state[field] || '',
              onChange: this.handleChange
            })
          }
          {
            errors[field] && <p className="red">{errors[field]}</p>
          }
        </div>
      )
    }

    getFieldsValue = () => {
      return { ...this.state };
    }

    getFieldValue = (field) => {
      return this.state[field];
    }

    validate = (state, cb) => {
      let errors = {};
      const { options } = this;
      for (let field in options) {
        if (!state[field]) {
          // 简单判断 undefined为不合法
          errors[field] = options[field].rules[0].message;
        }
      }
      this.setState({ ...state, errors }, cb)
    }

    validateFields = (callback) => {
      const state = { ...this.state };
      this.validate(state, () => {
        const { errors } = this.state;
        if (JSON.stringify(errors) === '{}') {
          callback(undefined, state);
        } else {
          callback(errors, state);
        }
      });
    }

    render() {
      const { form } = this;

      return (
        <div className="border">
          <Comp form={form} />
        </div>
      )
    }
  }
}

export default KFormCreate;
