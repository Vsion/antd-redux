import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

require('../../util/css/login.scss');
const App = Form.create()(React.createClass({
   getInitialState(){
     return {
       verification: "uymu",
       userName:"",
       isChecked: false,
     };
   },
   checkCookie(){
      var userName = this.getCookie('userName');
      if (userName!=null && userName!="") {
        this.setState({"userName": userName, "isChecked" :true});
      }
   },
   setCookie(userName, value, expiredays){
     var exdate=new Date();exdate.setDate(exdate.getDate() + expiredays);
     var dateStr = (expiredays == null ? "" : " ;expires=" + exdate.toGMTString());
     document.cookie= userName + "=" + escape(value) + dateStr;
   },
   getCookie(userName)
   {
     if (document.cookie.length>0) {
       return document.cookie.replace(userName+"=","");
     }
     return ""
   },
   deleteCookie(sKey, sPath, sDomain){
    if (!sKey || !(new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
   },
   handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        window.location.href = "./index";
      }
    });
    if(this.state.isChecked){
      this.setCookie('userName',this.state.userName,7)
    }else{
      this.deleteCookie('userName');
    }
  },
  onCodeChange(e){
    console.log(e.target.value);
  },
  onRemChange(e){
    this.setState({"isChecked": !this.state.isChecked},function(){
      console.log(this.state.isChecked);
    });
  },
  onNameChange(e){
    this.setState({userName: e.target.value});
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    let _this = this;
    return (
      <div id="loginDiv" style={{height:"100%"}}>
        <Form
          inline
          onSubmit={this.handleSubmit}
          style={{ position: "absolute" ,textAlign:"center",height: 220, top:0, bottom: 0, left: 0, right: 0, margin:"auto" }}
          >
          <FormItem style={{height: 50}} help="123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
              valuePropName: 'value',
              initialValue: this.state.userName,
            })(
              <Input onChange={this.onNameChange} autoComplete="off" style={{width: 200}} addonBefore={<Icon type="user" />} placeholder="Username" />
            )}
          </FormItem><br/>
          <FormItem style={{height: 50}}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input autoComplete="off" style={{width: 200}} addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem><br/>
          <FormItem style={{textAlign: "left", height: 50}}>
            {getFieldDecorator('verification', {
              rules: [{ required: true, message: '请输入的验证码!', test: true },

                    ],
            })(
              <Input autoComplete="off" maxLength="4" onChange={this.onCodeChange} style={{ width: 155}} type="text" placeholder="Code" />
            )}
            <div className="codeDiv">
              <img className="codeImg" id="Code" src={require("svc2Src/util/img/code.png")} />
            </div>

          </FormItem><br/>
          <FormItem style={{textAlign: "left"}}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: this.state.isChecked,
            })(
              <Checkbox setFieldsValue={this.state.isChecked} onChange={this.onRemChange}>Remember me</Checkbox>
            )}
            <br />
            <Button style={{width: 225}} type="primary" htmlType="submit">Log in</Button>

          </FormItem>
        </Form>
      </div>
    );
  },
  componentDidMount(){
    this.checkCookie();
  },
  // {validator(rule, value, callback, source, options) {
  //   var errors = [];
  //   if(!!!value){// || value.length < 4){// || value.toLowerCase() != _this.state.verification){
  //     errors = ["请输入正确的验证码!"]
  //   }
  //   callback(errors);
  //   }
  // }
}));

module.exports = App;
