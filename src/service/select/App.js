import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';

import Select from 'svc2Src/components/Select/Select';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

require('svc2Src/util/css/common.scss');

const options = [
  {value: "1", text: "111"},
  {value: "2", text: "222"},
  {value: "3", text: "333"},
  {value: "4", text: "444"},
  {value: "5", text: "555"},
]
const App = React.createClass({
  getInitialState(){
    return {
      value: ""
    }
  },
  handleChange(value) {
    this.setState({value: value});
    console.log(`selected ${value}`);
  },
  render() {
    return (
      <div>
        <Select width={200} value={this.state.value} placeholder="请选择" onChange={this.handleChange} options={options} />
      </div>
    );
  },
  componentDidMount(){
    var _this = this;
    setTimeout(function(){
      _this.setState({value: "2"});
    },1100)
  }
});

module.exports = App;
