import common from 'svc2Src/util/js/common'
import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const HHSelect = React.createClass({

  render(){
    let optionList = [];
    this.props.options.map(function(o,i,objs){
      optionList.push(<Option value={o.value} key={o.value}>{o.text}</Option>)
    });
    return (
      <Select
        showSearch
        style={{ width: this.props.width }}
        placeholder={this.props.placeholder}
        optionFilterProp="children"
        onChange={this.props.onChange}
        notFoundContent="没有数据"
        value={this.props.value}
      >
        {optionList}
      </Select>
    )
  }
});

module.exports = HHSelect;
