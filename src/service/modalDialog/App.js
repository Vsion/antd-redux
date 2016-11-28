import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import Add from './add/Add';
import { Button } from 'antd';
import $ from 'jquery';
import confirm from 'svc2Src/components/HHConfirm/Confirm';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.text,
    visible: state.visible
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
     return {  };
   },
   showModal() {
     this.props.actions.toggleModal(true);
     setTimeout(function(){
       let winHeight =window.innerHeight;
       let modalHeight = winHeight*0.7;
       let bodyHeight = winHeight*0.7 - 103 - 32;//为什么又减32 估计是padding 的问题
       $(".ant-modal-content").height(modalHeight);
       $(".ant-modal-body").height(bodyHeight);
       $(".ant-modal-body").css("overflow","auto");
     },50)
   },

    // submit = async() => {
    //   let params = form.getParams()
    //   let flag = await confirm();
    //   flag?dispatch("success"):dispatch("fail")
    // },
   showConfirm : async function() {
     let flag = await confirm({
       title:"这是title?",
       content:"这是content?",
       okText:"确定",
       cancelText: "取消",
     });
     console.log(flag);
   },
   render() {
     return (
       <div>
         <Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>
         <Button type="confirm" onClick={this.showConfirm}>Open a Confirm</Button>
         {this.props.visible ? <Add /> : null}
       </div>
     );
   },
 });

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(App);
