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
  onmouseenter(){
    this.setState({isShow: true});
  },
  onmouseleave(){
    this.setState({isShow: false});
  },
  onchange1(e){
    this.setState({input1: e.target.value});
    this.setState({input3: parseInt(this.state.input2) + parseInt(e.target.value)});
  },
  onchange2(e){
    this.setState({input2: e.target.value});
    this.setState({input3: parseInt(this.state.input1)  + parseInt(e.target.value) });
  },
  render() {
    return (
      <div>
        <Select width={200} value={this.state.value} placeholder="请选择" onChange={this.handleChange} options={options} />
        <div>
          <ul>
            <li onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave}>
            {this.state.isShow?
              123: <span>222</span>}
            </li>
            <input value={this.state.input1} onChange={this.onchange1} />
            <input value={this.state.input2} onChange={this.onchange2} />
            <input value={this.state.input3} onChange={this.onchange3} />
          </ul>
        </div>
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
