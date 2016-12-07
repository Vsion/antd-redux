import React from 'react';
import { Icon } from 'antd';
require('./HHQueryForm.scss');
let params;
const QueryParamsLabel = React.createClass({
  onClick(e){
    if(e.target.getAttribute("disabled") == "disabled")return;
    e.target.setAttribute("class", "queryItem disqueryItem");
    e.target.setAttribute("disabled", "disabled");
    this.props.resetItem(e.target.getAttribute("name"));
  },
  render(){
    if(this.props.isSearching){
      return (
        null
      )
    }
    let items = [];
    if(params != this.props.params){
      params = this.props.params;
    }
    let _this = this;
    params.map(function(o,i,objs){
      var title = o.value.replace(",", "\n");
      var value = o.value;
      if(value.length > 6){
        value = value.substr(0,5) + "...";
      }
      items.push(<div name={o.name} onClick={_this.onClick} title={title} key={items.length} className="queryItem">{o.label}: {value}</div>);
    });
    if(items.length < 1) {
      items = <div className="queryItem nodataItem">暂无数据</div>;
    }
    return(
      <div style={this.props.style} className="queryDiv">
        {items}
      </div>
    )
  }
});
module.exports = QueryParamsLabel;
