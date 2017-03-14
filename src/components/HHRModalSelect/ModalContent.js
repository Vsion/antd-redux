import React from 'react';
import {Button, Icon, Input, Breadcrumb, Checkbox } from 'antd';
import ModalList from './ModalList';
import BreadcrumbCon from './BreadcrumbCon';
import Query from './Query';

const ModalContent = React.createClass({
  getInitialState(){
    let list = this.getPath(_.clone(this.setList(this.props.options.list)));
    let showList = _.filter(list, function(o){
      return !!!o.pid;
    });
    return {
      list: list,
      showList: showList,
      prevList: showList,//记录上一次选中的list
      breadItems: [],
    };
  },
  getPath(list){
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
      return o;
    });
  },
  onLabelClick(item){
    var list = _.filter(this.state.list, {pid: item.id});
    this.setState({showList: list, prevList: list});
    this.setCurrItem(item);
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
  setCurrItem(item){
    console.log(item);
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
  },
  onCheckChange(o, isChecked){
    debugger
  },
  render(){
    return (
        <div className="rModalSelect" ref="dom" style={{width: "100%", height: this.props.contentHeight}}>
          <Query selectedItems={this.state.selectedItems} onClearClick={this.onClearClick} onKeyup={this.onKeyup}/>
          <BreadcrumbCon onBreadClick={this.onBreadClick} items={this.state.breadItems} />
          <ModalList onCheckChange={this.onCheckChange} showList={this.state.showList} onLabelClick={this.onLabelClick} />
        </div>
    )
  },
  componentDidMount(props) {
    this.setTextAlign();
  },
  setTextAlign(){
    let footer = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-footer");
    let close = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-close");
    footer.style.textAlign="center";
    footer.style.borderTop="none";
    close.style.top="8px";
    close.style.right="8px";
  }
})

module.exports = ModalContent;
