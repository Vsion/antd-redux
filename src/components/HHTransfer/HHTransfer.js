import React from 'react';
import { Transfer } from 'antd';


const HHTransfer = React.createClass({
  getInitialState() {
    return {

    };
  },

  render() {
    return (
      <Transfer
        style={this.props.style}
        dataSource={this.props.dataSource}
        targetKeys={this.props.targetKeys}
        onChange={this.props.onChange}
        onSelectChange={this.props.onSelectChange}
        render={item => item.title}
      />
    );
  },
});

module.exports = HHTransfer;
