import React from 'react';
import { Dropdown, Button, Menu, Icon } from 'antd';

require('./dropdown.scss');
const HHDropdown = React.createClass({
   getInitialState(){
     return { };
   },
   onClick(e){
     this.props.menu.map(function(o,i,objs){
       if(o.key == e.key){
         o.func();
       }
     })
   },
   render() {
     const items = this.props.menu.map(function(o,i,objs){
         return (
           <Menu.Item key={o.key}>{o.name}</Menu.Item>
         )
       })
     const menu = (
       <Menu onClick={this.onClick}>
          {items}
       </Menu>
     );
     return (
       <Dropdown overlay={menu}>
         <Button type={this.props.buttonType}>
           {this.props.text} <Icon type="down" />
         </Button>
       </Dropdown>
     );
   },
 });

module.exports = HHDropdown;
