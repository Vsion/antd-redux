import React from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import moment from 'moment';
import zh_cn from 'moment/locale/zh-cn';
import enUS from 'antd/lib/date-picker/locale/en_US';

let locale = enUS;//
let defaultValue = null;//moment().locale('en').utcOffset(0);//时间

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // can not select days before today and today
  return null;//current && current.valueOf() < Date.now();
}

function disabledTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours() {
        return range(0, 0);
      },
      disabledMinutes() {
        return range(0, 0);
      },
      disabledSeconds() {
        return range(0, 0);
      },
    };
  }
  return {
    disabledHours() {
      return range(0, 0);
    },
    disabledMinutes() {
      return range(0, 0);
    },
    disabledSeconds() {
      return range(0, 0);
    },
  };
}
const HHMonthPicker = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     var isReflesh = this.props.isReflesh;
     if(isReflesh != true && isReflesh != false){
       isReflesh = false;
     }
     return (
       !isReflesh?<MonthPicker
         defaultValue={this.props.defaultValue || null}
         locale={locale}
         placeholder={this.props.placeholder || "请选择月份"}
         format={this.props.format}
         disabledDate={this.props.disabledDate || disabledDate}
         onChange={this.props.onChange || null}
       />:null
     );
   },
 });

const HHDatePicker = React.createClass({
  getInitialState(){
    return { };
  },
  render() {
    var isReflesh = this.props.isReflesh;
    if(isReflesh != true && isReflesh != false){
      isReflesh = false;
    }
    return (
      !isReflesh?<DatePicker
        defaultValue={this.props.defaultValue || null}
        locale={locale}
        placeholder={this.props.placeholder || "选择时间"}
        format={this.props.format || "YYYY-MM-DD"}
        showTime={this.props.showTime}
        disabledDate={this.props.disabledDate || disabledDate}
        disabledTime={this.props.disabledTime || disabledTime}
        onChange={this.props.onChange || null}
      />:null
    );
  },
});

const HHRangePicker = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     var placeholder = [this.props.startPlaceholder || "开始时间", this.props.endPlaceholder || "结束时间"];
     var isReflesh = this.props.isReflesh;
     if(isReflesh != true && isReflesh != false){
       isReflesh = false;
     }
     return(
       !isReflesh?<RangePicker
         placeholder={placeholder}
         startPlaceholder={this.props.startPlaceholder || "开始时间"}
         endPlaceholder={this.props.endPlaceholder || "结束时间"}
         defaultValue={[this.props.defaultStartValue || null,this.props.defaultEndValue || null]}
         locale={locale}
         format={this.props.format}
         showTime={this.props.showTime}
         disabledDate={this.props.disabledDate || disabledDate}
         disabledTime={this.props.disabledTime || disabledTime}
         onChange={this.props.onChange || null}
       />:null
     );
   },
 });

module.exports = {
  HHMonthPicker,
  HHDatePicker,
  HHRangePicker
};
