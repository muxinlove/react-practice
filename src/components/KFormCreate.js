import React, { Component } from 'react'
// import Schema from 'async-validate'

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
      // this.setState({ [name]: value }, () => {
      //   this.validateField(name);
      // })
    }

    // validateField = (field) => {
    //   // 规则
    //   const rules = this.options[field].rules;
    //   // 当前值
    //   const value = this.state[field]

    //   // 校验描述对象
    //   const desc = { [field]: rules };
    //   // 创建Schema实例
    //   const schema = new Schema(desc);
    //   const { errors } = this.state;
    //   let source = {};
    //   switch (field) {
    //     case 'name':
    //       source.name = value;
    //       break;
    //     default:
    //       source.password = value;
    //   }
    //   // let source = { [field], value };

    //   schema.validate(source, e => {
    //     if (e) {
    //       errors[field] = e[0].message;
    //     } else {
    //       // 校验通过
    //       errors[field] = '';
    //     }
    //     this.setState({ errors })
    //   });
    // }

    getFieldDecorator = (field, option) => InputComp => {
      //  初始化 保存fidld option
      this.options[field] = option;
      const { errors } = this.state;
      // 克隆一份 自定义双向绑定
      return (
        <div>
          {
            React.cloneElement(InputComp, {
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
