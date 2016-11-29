import React from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import moment from 'moment';
import zh_cn from 'moment/locale/zh-cn';
import enUS from 'antd/lib/date-picker/locale/en_US';

let locale = enUS;//
let defaultValue = moment().locale('en').utcOffset(0);//时间
//
// let locale = {
//   timezoneOffset: 8 * 60,
//   firstDayOfWeek: 1,
//   minimalDaysInFirstWeek: 1,
//
//   lang: {
//     today: '今天',
//     now: '此刻',
//     ok: '确定',
//     clear: '清除',
//     previousMonth: '上个月 (翻页上键)',
//     nextMonth: '下个月 (翻页下键)',
//     placeholder: '请选择日期',
//     timePlaceholder: '请选择时间',
//     monthSelect: '选择月份',
//     yearSelect: '选择年份',
//     decadeSelect: '选择年代',
//     hourInput: '上一小时(上方向键), 下一小时(下方向键)',
//     minuteInput: '上一分钟(上方向键), 下一分钟(下方向键)',
//     secondInput: '上一秒(上方向键), 下一小时(下方向键)',
//     hourPanelTitle: '选择小时',
//     minutePanelTitle: '选择分钟',
//     secondPanelTitle: '选择秒',
//     yearFormat: 'yyyy年',
//     monthFormat: 'M月',
//     dateFormat: 'yyyy年M月d日',
//     previousYear: '上一年 (Control键加左方向键)',
//     nextYear: '下一年 (Control键加右方向键)',
//     previousDecade: '上一年代',
//     nextDecade: '下一年代',
//     previousCentury: '上一世纪',
//     nextCentury: '下一世纪',
//
//     format: {
//       eras: ['公元前', '公元'],
//       months: ['一月', '二月', '三月', '四月', '五月', '六月',
//       '七月', '八月', '九月', '十月', '十一月', '十二月'],
//       shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月',
//       '七月', '八月', '九月', '十月', '十一月', '十二月'],
//       weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四',
//       '星期五', '星期六'],
//       shortWeekdays: ['周日', '周一', '周二', '周三', '周四', '周五',
//       '周六'],
//       veryShortWeekdays: ['日', '一', '二', '三', '四', '五', '六'],
//       ampms: ['上午', '下午'],
//       datePatterns: ["yyyy'年'M'月'd'日' EEEE", "yyyy'年'M'月'd'日'", "yyyy-M-d", "yy-M-d"],
//       timePatterns: ["ahh'时'mm'分'ss'秒' 'GMT'Z", "ahh'时'mm'分'ss'秒'", "H:mm:ss", "ah:mm"],
//       dateTimePattern: '{date} {time}'
//     }
//   }
// };
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
     return (
       <MonthPicker
         defaultValue={defaultValue}
         locale={locale}
         placeholder={this.props.placeholder || "请选择月份"}
         format={this.props.format}
         disabledDate={this.props.disabledDate || disabledDate}
         onChange={this.props.onChange || null}
       />
     );
   },
 });

const HHDatePicker = React.createClass({
  getInitialState(){
    return { };
  },
  render() {
    return (
      <DatePicker
        defaultValue={defaultValue}
        locale={locale}
        placeholder={this.props.placeholder}
        format={this.props.format}
        showTime={this.props.showTime}
        disabledDate={this.props.disabledDate || disabledDate}
        disabledTime={this.props.disabledTime || disabledTime}
        onChange={this.props.onChange || null}
      />
    );
  },
});

const HHRangePicker = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     var placeholder = [this.props.startPlaceholder || "开始时间", this.props.endPlaceholder || "结束时间"];
     return(
       <RangePicker
         placeholder={placeholder}
         startPlaceholder={this.props.startPlaceholder || "开始时间"}
         endPlaceholder={this.props.endPlaceholder || "结束时间"}
         defaultValue={[defaultValue,defaultValue]}
         locale={locale}
         format={this.props.format}
         showTime={this.props.showTime}
         disabledDate={this.props.disabledDate || disabledDate}
         disabledTime={this.props.disabledTime || disabledTime}
         onChange={this.props.onChange || null}
       />
     );
   },
 });

module.exports = {
  HHMonthPicker,
  HHDatePicker,
  HHRangePicker
};
