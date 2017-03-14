import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';

const Query = React.createClass({
  getInitialState(){
    return {

    }
  },
  render(){
    let btnType = { type: "primary" };
    return (
      <div>
        <div className="top">
          <Input onChange={this.props.onKeyup} />
          <Button onClick={this.props.onClearClick}>清除已选结果</Button>
        </div>
        <div className="panel">
          <Button {...btnType}>test</Button>
        </div>
      </div>
    )
  }
});

module.exports = Query;
