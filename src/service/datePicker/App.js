import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { HHMonthPicker, HHDatePicker, HHRangePicker } from 'svc2Src/components/HHDatePicker/HHDatePicker';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import 'svc2Src/util/css/common.scss';

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}


function disabledDate(current) {
  // can not select days before today and today
  return current && current.valueOf() < Date.now();
}

function disabledTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours() {
        return range(0, 60).splice(10, 14);
      },
      disabledMinutes() {
        return range(30, 60);
      },
      disabledSeconds() {
        return [55, 56];
      },
    };
  }
  return {
    disabledHours() {
      return range(0, 60).splice(20, 4);
    },
    disabledMinutes() {
      return range(0, 31);
    },
    disabledSeconds() {
      return [55, 56];
    },
  };
}

const App = React.createClass({
  getInitialState(){
    return {
      value: ""
    }
  },
  onChange(date, dateString){
     console.log(date, dateString);
  },
  render() {
    return (
      <div>
        <HHRangePicker format="YYYY-MM-DD HH:00:00" showTime={true} disabledDate={disabledDate} disabledTime={disabledTime} onChange={this.onChange} />
        <HHMonthPicker showTime={true} disabledTime={disabledTime} onChange={this.onChange} />
        <HHDatePicker format="YYYY-MM-DD HH:00:00" showTime={true} disabledDate={disabledDate} disabledTime={disabledTime} onChange={this.onChange} />
      </div>
    );
  },
});

module.exports = App;
