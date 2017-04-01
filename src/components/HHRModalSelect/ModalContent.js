import React from 'react';
import {Button, Icon, Input, Breadcrumb, Checkbox } from 'antd';
import List from './List';
import BreadcrumbCon from './BreadcrumbCon';
import Query from './Query';
import _ from 'lodash';
let state = {};
const ModalContent = React.createClass({
  getInitialState(){
    let disabledItems = this.props.options.disabledItems || [];
    let list = this.setDetfultList(_.clone(this.setList(this.props.options.list)), disabledItems);
    let showList = _.filter(list, function(o){
      return !!!o.pid;
    });
    // let selectedItems = this.getDetaultSelectedItems(this.props.options.defaultValue, list);
    // let defaultValue = this.getValue(selectedItems);
    state = {
      list: list,
      showList: showList,
      prevList: showList,//记录上一次显示的list 主要用于keyup value=""
      breadItems: [],
      selectedItems: this.props.detaultSelectedItems,
      disabledItems: disabledItems,
    };
    return state;
  },

  getDetaultSelectedItems(defaultValue, list){
    var res = [];
    if(!!defaultValue && JSON.stringify(defaultValue) != "{}"){
      for(var name in defaultValue){
        var names = defaultValue[name].split(",");
        names.forEach(function(o, i){
          res.push(_.filter(list, {type: name, id:o})[0])
        });
      }
    }
    return res;
  },
  setDetfultList(list, disabledItems){
    return list.map(function(o, i, objs){
      let path = "\\";
      var pid = o.pid;
      while(!!pid){
        var p = _.filter(objs, {id: pid})[0];
        path ="\\" + p.label + path;
        pid = p.pid;
        p.hasChildNode = true;
      }
      o.path = path;
      var _id = o.type + "_" + o.id;
      o._id = _id;
      // o.checked = false;
      if(disabledItems.indexOf(_id) > -1){
        o.disabled = true;
      }
      return o;
    });
  },
  onLabelClick(item){
    var list = _.filter(this.state.list, {pid: item.id});
    this.setState({showList: list, prevList: list});
    this.setCurrBreadByItem(item);
  },
  setList(list){
    list.map(function(o){
      for(var i in o){
        if(!!!o[i] || o[i]+"" == "null"){
          o[i] = "";
        }
      }
      return o;
    });
    return list;
  },
  onKeyup(e){
    let value = e.target.value;
    console.log(value);
    var list = _.filter(this.state.list, function(o){
      return o.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    if(!!value){
      this.setState({showList: list});
    }
    else{
      this.setState({showList: this.state.prevList});
    }
  },
  setCurrBreadByItem(item){
    let breadItems = [];
    var pid = item.pid;
    while(pid){
      var p = _.filter(this.state.list, {id: pid})[0];
      breadItems.unshift(p);
      pid = p.pid;
    }
    breadItems.push(item);
    this.setState({ breadItems: breadItems })
  },
  onBreadClick(item, j){
    let list = _.filter(this.state.list, {pid: item.pid});
    let breadItems = _.filter(this.state.breadItems, function(o,i){
      return j > i;
    });
    this.setState({prevList: list, showList: list, breadItems: breadItems});
  },
  onClearClick(){
    //清除选中项
    this.setState({selectedItems: []});//, value: this.getValue([])});
  },
  onCheckChange(o, isChecked){
    var selected = [], disabled = this.state.disabledItems, isChange = false;
    o.isChecked = isChecked;
    if(!!this.props.onItemCheck){
      let res = this.props.onItemCheck(o, isChecked, this.state.selectedItems, this.state.list)
      selected = res.selectedItems;
      disabled = res.disabledItems;
      if(!!disabled && disabled.toString() != this.state.disabledItems.toString()) isChange = true;
    }else{
      if(isChecked){
          selected = _.clone(this.state.selectedItems);
          selected.push(o);
      }else {
        selected = this.getSelected_ByDeleteItem(o);
      }
    }
    this.setState(this.getStateByDisSel(selected, disabled, isChange));//, value: this.getValue(selected)});
  },
  getStateByDisSel(selected, disabled, isChange){
    var res;
    if(!isChange){
      res = { selectedItems: selected };
    }else{
      res = {
        list: this.setDisabled(this.state.list, disabled),
        showList: this.setDisabled(this.state.showList, disabled),
        prevList: this.setDisabled(this.state.prevList, disabled),
        selectedItems: this.setDisabled(selected, disabled),
      }
    }
    return res;
  },
  setDisabled(list, disabled){
    return list.map(function(o, i){
      if(disabled.indexOf(o.type + "_" + o.id) > -1){
        o.disabled = true;
      }
      return o;
    });
  },
  getSelected_ByDeleteItem(o){
    var selected = [];
    this.state.selectedItems.map(function(obj, i){
      if(!(o.id == obj.id && o.type == obj.type)){
        selected.push(obj);
      }
    });
    return selected;
  },
  onItemClick(o){
    let selected = this.getSelected_ByDeleteItem(o);
    this.setState({selectedItems:selected});//, value: this.getValue(selected)});
  },
  reset(){
    this.setState(Object.assign({}, this.state, state));
  },
  confirm(){
    state = _.clone(this.state);
  },
  onModalSubmit(res){
    this.setState({selectedItems: res});//, value: this.getValue(res)});
  },
  render(){
    return (
        <div className="rModalSelect" ref="dom" style={{width: "100%", height: this.props.contentHeight}}>
          <Query onItemClick={this.onItemClick} selectedItems={this.state.selectedItems} onClearClick={this.onClearClick} onKeyup={this.onKeyup}/>
          <BreadcrumbCon onBreadClick={this.onBreadClick} items={this.state.breadItems} />
          <List onItemCheck={this.props.onItemCheck} selectedItems={this.state.selectedItems} onCheckChange={this.onCheckChange} showList={this.state.showList} onLabelClick={this.onLabelClick} />
        </div>
    )
  },
  componentDidMount(props) {
    this.setTextAlign();
  },
  setTextAlign(){
    let footer = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-footer");
    let close = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-close");
    // footer.style.textAlign="center";
    footer.style.borderTop="none";
    close.style.top="8px";
    close.style.right="8px";
  }
})

module.exports = ModalContent;
