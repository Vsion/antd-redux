import React from 'react';
import { Icon } from 'antd';
require('./HHQueryForm.scss');

const QueryParamsLabel = React.createClass({
  render(){
    let items = [];
    let params = this.props.params;
    params.map(function(o,i,objs){
      var title = o.value.replace(",", "\n");
      var value = o.value;
      if(value.length > 6){
        value = value.substr(0,5) + "...";
      }
      items.push(<div title={title} key={items.length} className="queryItem">{o.label}: <span className="queryValue">{value}</span></div>);
    })
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
