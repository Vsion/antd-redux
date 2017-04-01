import React from 'react';
import { Checkbox } from 'antd';

const Item = React.createClass({
  getInitialState(){
    return {

    }
  },
  render(){
    return (
      <tr>
        <td className="item-type">{this.props.itemObj.type}</td>
        <td className="item-name">
          <span>
            <span className="inputSpan ant-checkbox">
              <Checkbox disabled={this.props.isDisabled} checked={this.props.isChecked} onChange={this.props.onChange} />
            </span>
            {this.props.label}
          </span>
        </td>
        <td className="item-path">{this.props.itemObj.path}</td>
      </tr>
    )
  }
});

module.exports = Item;
