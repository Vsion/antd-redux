import React from 'react';
import { Modal, Button } from 'antd';

const HHModal = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     let winHeight =window.innerHeight;
     let modalHeight = winHeight*0.8, bodyHeight = winHeight*0.8 - 103;
     return (
       <Modal title={this.props.title} visible={this.props.visible}
         onOk={this.props.onOk} onCancel={this.props.onCancel}
         maskClosable={false}
         width={this.props.width}
         style={{maxHeight: modalHeight}}
         footer={[
           <Button key="back" onClick={this.props.onCancel} type="ghost" size="large">取消</Button>,
           <Button key="submit" onClick={this.props.onOk} type="primary" size="large" loading={this.props.loading}>
             确定
           </Button>]}
       >
         {this.props.children}
       </Modal>
     );
   },

    // componentDidMount: function(){
    //   setTimeout(function(){
    //     let winHeight =window.innerHeight;
    //     let modalHeight = winHeight*0.8;
    //     let bodyHeight = winHeight*0.8 - 103;
    //     $(".ant-modal-content").height(modalHeight);
    //     $(".ant-modal-body").height(bodyHeight);
    //   },1000)
    // }
 });

module.exports = HHModal;
