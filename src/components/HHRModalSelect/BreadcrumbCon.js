import React from 'react';
import _ from 'lodash';
import { Breadcrumb } from 'antd';

const BreadcrumbCon = React.createClass({
  getInitialState(){
    return {

    }
  },
  getItems(items){
    let _this = this;
    return items.map(function(o, i){
      return (
          <Breadcrumb.Item key={i} onClick={function(){_this.props.onBreadClick(o, i)}} href="javascript:void(0);">{o.label}</Breadcrumb.Item>
      )
    })
  },
  render(){
    let items = this.getItems(this.props.items);
    if(items.length < 1){
      items = <Breadcrumb.Item>All: 顶层</Breadcrumb.Item>
    }
    return (
      <div className="bread">
        <Breadcrumb>
          {items}
        </Breadcrumb>
      </div>
    )
  }
});

module.exports = BreadcrumbCon;
