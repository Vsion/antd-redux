import React from 'react';
import { Card } from 'antd';

const HHCard = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     return (
       <Card style={this.props.style} title={this.props.title} extra={this.props.extra}>
         {this.props.children}
       </Card>
     );
   },
 });

module.exports = HHCard;
