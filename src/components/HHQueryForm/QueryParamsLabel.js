import React from 'react';
import { Icon } from 'antd';
require('./HHQueryForm.scss');
let params;
const Label = React.createClass({
  getInitialState(){
    return {
      isDisabled: false,
      value: this.props.value
    }
  },
  onClick(e){
    if(this.state.isDisabled) return;
    this.setState({isDisabled: true});
    this.props.onClick(e);
  },
  componentDidUpdate(){
    if(!this.state.isDisabled){
      return;
    }
    if(this.props.value.toString() != this.state.value.toString()){
      this.setState({isDisabled: false, value: this.props.value.toString()});
    }
  },
  render(){
    let className = "queryItem";
    if(this.state.isDisabled){
      className = "queryItem disqueryItem";
    }
    return (
      <div name={this.props.name} onClick={this.onClick} title={this.props.title} className={className}>{this.props.children}</div>
    )
  }
});
const QueryParamsLabel = React.createClass({
  onClick(e){
    this.props.resetItem(e.target.getAttribute("name"));
  },
  render(){
    let items = [];
    if(params != this.props.params){
      params = this.props.params;
    }
    let _this = this;
    params.map(function(o,i,objs){
      var value = o.value;
      var title;
      if(typeof value != "string"){
        title = "";
        return false;
      }else {
        title = o.value.replace(/,/g, "\n");
      }
      if(value.length > 6){
        value = value.substr(0,5) + "...";
      }
      items.push(<Label value={o.value} name={o.name} onClick={_this.onClick} title={title} key={o.name}>{o.label}: {value}</Label>);
    });
    if(items.length < 1) {
      items = <div className="queryItem nodataItem">暂无数据</div>;
    }
    return(
      <div ref="dom" style={this.props.style} className="queryDiv">
        {items}
      </div>
    )
  }
});
module.exports = QueryParamsLabel;
