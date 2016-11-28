import React from 'react';
import { Form,Input,Icon,Button } from 'antd';
const FormItem = Form.Item;

// export default Form.create()(class App extends React.Component{
//   constructor (props) {
//     super(props);
//   }
//   render(){
//     return (
//       <HorizontalLoginForm/>
//     )
//   }
// })
const HorizontalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
            { required: true, message: 'Please input your username!' },
            {validator(rule, value, callback, source, options) {
              var errors = [];
              callback(errors);
            }}
            ],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Log in</Button>
        </FormItem>
      </Form>
    );
  }
}));
module.exports =  HorizontalLoginForm;
