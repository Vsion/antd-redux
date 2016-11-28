import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { message, Button, notification } from 'antd';

import {successMessage,errorMessage,warningMessage,loadingMessage,infoMessage,openNotificationWithIcon } from 'svc2Src/components/Message/Message';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.text,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const App = React.createClass({
  getInitialState(){
    carrier = getCarrier(this.props.actions,[]);
    return {

    };
  },
  outInfo() {
    carrier.dispatch({
      params: "外部info",
      fnName: "infoMessage",
      tag: "message",
    });
  },
  outNotiSucc() {
    carrier.dispatch({
      params: {type: "success", description: "测试一个描述"},
      fnName: "openNotification",
      tag: "notification",
    });
  },
  outNotiError() {
    carrier.dispatch({
      params: {type: "error", description: "报错"},
      fnName: "openNotification",
      tag: "notification",
    });
  },
  outNotiNoClose() {
    carrier.dispatch({
      params: {
        message: "我不会自己主动关闭",
        description: "点按钮才关闭",
        func: function(){alert("是的 你点击了关闭")}
      },
      fnName: "openNotificationNoClose",
      tag: "notification",
    });
  },
  render(){
    return (
      <div>
          外部的:
        <Button style={{marginRight: "5px"}} onClick={this.outInfo}>info</Button>
        <Button style={{marginRight: "5px"}} onClick={this.outNotiSucc}>succ</Button>
        <Button style={{marginRight: "5px"}} onClick={this.outNotiError}>error</Button>
        <Button style={{marginRight: "5px"}} onClick={this.outNotiNoClose}>noClose</Button>
      </div>
    );
  }
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(App);
