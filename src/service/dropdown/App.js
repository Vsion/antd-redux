import React from 'react';
import {render} from 'react-dom';
import HHPopconfirm from 'svc2Src/components/HHPopconfirm/HHPopconfirm';
import HHDropdown from 'svc2Src/components/HHDropdown/HHDropdown';
import HHStep from 'svc2Src/components/HHStep/HHStep';
import { alert, Button } from 'antd';
import { Steps } from 'antd';
const Step = Steps.Step;

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;

const menu = [
  {key: "1", name: "点我1", func: function(){
    outNotiSucc("1.", "点我1");
  }},
  {key: "2", name: "点我2", func: function(){
    outNotiSucc("2.", "点我2");
  }},
  {key: "3", name: "点我3", func: function(){
    outNotiSucc("3.", "点我3");
  }},
];
const outNotiSucc = function(message, des) {
  carrier.dispatch({
    params: {type: "info", description: des, message: message},
    fnName: "openNotification",
    tag: "notification",
  });
}
const App = React.createClass({
   getInitialState(){
     carrier = getCarrier(this.props.actions,[]);
     return {
       current: 0,
       status: "process",//wait process finish error 默认为process
       stepItems : [
         {title: "步骤1", icon: ""},
         {title: "步骤2", icon: ""},
         {title: "步骤3", icon: ""}
       ]
     };
   },
   confirm(){

   },
   changeStep(){
     var current = this.state.current + 1
     if(this.state.current >= (this.state.stepItems.length-1)){
       current = 0;
     }
     this.setState({current: current})
   },
   changeStatus(){
     if(this.state.status == "process"){
       this.setState({status: "wait"});
     }
     else if(this.state.status == "wait"){
       this.setState({status: "finish"});
     }
     else if(this.state.status == "finish"){
       this.setState({status: "error"});
     }
     else if(this.state.status == "error"){
       this.setState({status: "process"});
     }
   },
   render() {
     return (
       <div>

         <HHDropdown text="下拉按钮" buttonType="ghost" menu={menu} />
         <br /><br /><br /><br /><br /><br />
         <HHStep current={this.state.current} status={this.state.status} stepItems={this.state.stepItems} />
         <Button onClick={this.changeStep} >点我下一步</Button>
         <Button onClick={this.changeStatus} >点我换当前状态[{this.state.status}]</Button>

         <div  style={{ marginLeft: 180, marginTop:180 }}>
           <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
             <HHPopconfirm style={{width: 100}} buttonText="topLeft" placement="topLeft" title="topLeft" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="top" placement="top" title="top" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="topRight" placement="topRight" title="topRight" onConfirm={this.confirm} okText="Yes" cancelText="No" />
           </div>
           <div style={{ width: 70, float: 'left' }}>
             <HHPopconfirm style={{width: 100}} buttonText="leftTop" placement="leftTop" title="leftTop" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="left" placement="left" title="left" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="leftBottom" placement="leftBottom" title="leftBottom" onConfirm={this.confirm} okText="Yes" cancelText="No" />
           </div>
           <div style={{ width: 70, marginLeft: 350 }}>
             <HHPopconfirm style={{width: 100}} buttonText="rightTop" placement="rightTop" title="rightTop" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="right" placement="right" title="right" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="rightBottom" placement="rightBottom" title="rightBottom" onConfirm={this.confirm} okText="Yes" cancelText="No" />
           </div>
           <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
             <HHPopconfirm style={{width: 100}} buttonText="bottomLeft" placement="bottomLeft" title="bottomLeft" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="bottom" placement="bottom" title="bottom" onConfirm={this.confirm} okText="Yes" cancelText="No" />
             <HHPopconfirm style={{width: 100}} buttonText="bottomRight" placement="bottomRight" title="bottomRight" onConfirm={this.confirm} okText="Yes" cancelText="No" />
           </div>
         </div>
       </div>
     );
   },
 });

module.exports = App;
