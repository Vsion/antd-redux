import React from 'react';
import { Popconfirm, Button } from 'antd';

const HHPopconfirm = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     return (
       <Popconfirm
         placement={this.props.placement}
         title={this.props.title}
         onConfirm={this.props.confirm}
         okText={this.props.okText}
         cancelText={this.props.cancelText} >
         <Button style={this.props.style}>{this.props.buttonText}</Button>
       </Popconfirm>
     );
   },
 });

module.exports = HHPopconfirm;
