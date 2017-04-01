import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';

const Query = React.createClass({
  getInitialState(){
    return {

    }
  },
  getItem(type, items){
    var _this = this;
    var resItems = items.map(function(o, i){
      return(
        <Button key={i} onClick={function(){ _this.onClick(o) }} {...type}>{o.label}</Button>
      )
    });
    return resItems;
  },
  onClick(o){
    this.props.onItemClick(o);
  },
  render(){
    let btnType = { type: "primary" };
    let className = "panel ";

    var items = this.props.selectedItems;
    if(items.length < 1){
      className += "nodataPanel";
    }
    let selectedItems = this.getItem(btnType, items);
    
    return (
      <div>
        <div className="top">
          <Input onChange={this.props.onKeyup} />
          <Button onClick={this.props.onClearClick}>清除已选结果</Button>
        </div>
        <div className={className}>
          {selectedItems}
        </div>
      </div>
    )
  }
});

module.exports = Query;
