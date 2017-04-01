import React from 'react';
import _ from 'lodash';
import { Checkbox } from 'antd';
import Item from './Item';

const List = React.createClass({
  getInitialState(){
    return {

    }
  },
  getTbody(list){
    var _this = this;
    let dom = list.map(function(o, i, objs){
      let label = null;
      if(!!o.hasChildNode){
        label = <a onClick={function(){_this.onLabelClick(o)}} href="javascript:void(0);" className="nameSpan">{o.label}</a>;
      }else {
        label = <span className="nameSpan">{o.label}</span>;
      }
      let isChecked = false;
      var selectedItem = _.filter(_this.props.selectedItems, {id: o.id, type: o.type});
      if(selectedItem.length == 1){
        isChecked = true;
      }
      return (
        <Item key={i} label={label} itemObj={o} isDisabled={o.disabled || false} isChecked={isChecked} onChange={function(e){ _this.props.onCheckChange(o, e.target.checked)}} />
      )
    });
    return dom;
  },
  onLabelClick(item){
    this.props.onLabelClick(item);
  },
  render(){
    let tbody = this.getTbody(this.props.showList);
    return (
      <div className="list">
        <div className="listTitle">
          <div className="titleItem">类别</div>
          <div className="titleItem">名称</div>
          <div className="titleItem">路径</div>
        </div>
        <div className="listContent">
          <table>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

module.exports = List;
