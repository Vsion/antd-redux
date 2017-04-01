import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import Select from '../Select/Select';
import QueryParamsLabel from './QueryParamsLabel';
import _ from 'lodash';

import ModalSelect from '../HHModalSelect/index';
import RModalSelect from '../HHRModalSelect/index';
import { HHMonthPicker, HHDatePicker, HHRangePicker } from '../HHDatePicker/HHDatePicker';

require('./HHQueryForm.scss');

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
let onMsChange = (msObj)=>{
  //debugger
}
let onInputChange = (value)=>{
  //debugger
}
let formRefs, isInit = false;
const HHQueryForm = React.createClass({
  getRefs(){
    return formRefs;
  },
  render(){
    return (
      <HHForm
        ref="Form"
        Items={this.props.Items}
        onSubmit={this.props.onSubmit}
        onReset={this.props.onReset}
        btnSubmitLabel={this.props.btnSubmitLabel}
        btnResetLabel={this.props.btnResetLabel}
        listShowCount={this.props.listShowCount}
        rowLayoutCount={this.props.rowLayoutCount}
       />
    )
  }
});
const HHForm = Form.create()(React.createClass({
  getInitialState(){
    return {
      expand: false,
      isReflesh: false,
      isReset: false,
      isShowQuery: false,//this.props.isShowQuery,
      params: [],
      isResetRangePicker: false,
      isResetMonthPicker: false,
      isResetDatePicker: false,
    };
  },
  componentDidUpdate(){
    if(this.refs.qpl.refs.dom.innerText.indexOf("暂无数据") > -1 || !this.state.isShowQuery)return;
    this.refs.qpl.refs.dom.style.height = this.refs.qpl.refs.dom.scrollHeight + "px";
  },
  toggleExpand() {
    this.setState({ expand: !this.state.expand });
    if(this.props.toggleExpand){
      this.props.toggleExpand();
    }
  },
  toggleShowQuery() {
    this.setState({ isShowQuery: !this.state.isShowQuery });
    if(this.props.toggleShowQuery){
      this.props.toggleShowQuery();
    }
  },
  componentDidMount() {
    //console.log(this.refs.ms);
    this.getRefs();
  },
  getRefs(){
    formRefs=this.refs;
  },
  getItem(Items,i,getFieldDecorator,formItemLayout){
    var name = Items[i].name;
    var initValue = Items[i].initialValue//isInit ?  : null
    switch (Items[i].type) {
      case "Input":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               initialValue: initValue || null,
            })(
              <Input onChange={onInputChange} placeholder={Items[i].placeholder || "请选择"} />
            )}
          </FormItem>);
      case "Select":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               initialValue: initValue || "",
            })(
              <Select placeholder="请选择" options={Items[i].options} />
            )}
          </FormItem>);
      case "RangePicker":
        return(
          this.state.isResetRangePicker? null :
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'array' }],
               initialValue: initValue || null,
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHRangePicker dValue={initValue} isReflesh={this.state.isReflesh} format="YYYY-MM-DD HH:mm:ss" showTime={true} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} />
             )}
           </FormItem>);
      case "DatePicker":
        return(
          this.state.isResetDatePicker? null :
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'string' }],
               initialValue: initValue || null,
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHDatePicker dValue={initValue} isReflesh={this.state.isReflesh} format="YYYY-MM-DD" showTime={false} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} />
             )}
           </FormItem>);
      case "MonthPicker":
        return(
          this.state.isResetMonthPicker? null :
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'string' }],
               initialValue: initValue || null,
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHMonthPicker dValue={initValue} isReflesh={this.state.isReflesh} format="YYYY-MM" showTime={true} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} />
             )}
           </FormItem>);
      case "ModalSelect":
        return(
          //自定义模块组件 引入到FormItem getFieldDecorator中
          <FormItem {...formItemLayout} label={Items[i].label}>
             {getFieldDecorator(name)(
                <ModalSelect isReset={this.state.isReset} size="large" onChange={onMsChange} placeholder={Items[i].placeholder} option={Items[i].opt} defaultMsValue={initValue}/>
             )}
           </FormItem>);
       case "RModalSelect":
         return(
           //自定义模块组件 引入到FormItem getFieldDecorator中
           <FormItem {...formItemLayout} label={Items[i].label}>
              {getFieldDecorator(name)(
                 <RModalSelect options={Items[i].opt} />
              )}
            </FormItem>);
      default:
        return null;
    }
  },
  onSubmit(e){
    e.preventDefault();
    let _this = this;
    this.props.form.validateFields((err, fvalues) => {
      var values = fvalues;
      this.props.Items.map(function(o,i,objs){
        if(o.type == "ModalSelect"){
          values = Object.assign(values, _this.props.form.getFieldInstance(o.name).inst.getVal());
          //todo
          //this.props.form.getFieldInstance(o.name).inst.getSelectedItems()
          delete values[o.name];
        }
        if(o.type == "RModalSelect"){
          values = Object.assign(values, _this.props.form.getFieldInstance(o.name).state.value)
          delete values[o.name];
        }
      });
      values = _this.getFValues(values);
      _this.props.onSubmit(values);
      _this.setParams(values);
    });
  },
  getFValues(values){
    var temp = _.clone(values);
    for(var i in temp){
      if(!!!temp[i]){
        delete temp[i];
      }
    }
    return temp;
  },
  setParams(values){
    var items = [];
    for(var i = 0;i < this.props.Items.length; i++){
      var o = this.props.Items[i];
      if(o.type == "ModalSelect"){
        var msItems = this.props.form.getFieldInstance(o.name).inst.getSelectedItems(),value = "";
        if(msItems.length > 0){
          msItems.map(function(obj,i,objs){
            if(!!value) value += ","
            value += obj.label;
          });
          items.push({label: o.label, name: o.name, value: value});
        }
      }
      else if(o.type == "RModalSelect"){
        var value = this.props.form.getFieldInstance(o.name).state.inputValue;
        if(!!value){
          items.push({label: o.label, name: o.name, value: value});
        }
      }
      else if(o.type == "Select"){
        o.options.map(function(oo, ii, oobjs){
          if(oo.value == values[o.name]){
            items.push({label: o.label, name: o.name, value: oo.text});
          }
        });
      }
      else if(!!values[o.name]){
        if(o.type == "RangePicker" && Array.isArray(values[o.name]) && !!values[o.name][0] && !!values[o.name][1]){
          items.push({label: o.label, name: o.name, value: values[o.name].join(" - ")})
        }
        else{
          items.push({label: o.label, name: o.name, value: values[o.name]})
        }
      }
    }
    this.setState({params: items})
  },
  reset(e) {
    var form = this.props.form;
    form.resetFields();
    this.props.Items.map(function(o,i,objs){
      if(o.type == "ModalSelect"){
        form.getFieldInstance(o.name).resetMs();
      }
    });
    this.setState({params: []});
    this.props.onReset();//回调
  },
  resetItem(name){
    let Items = this.props.Items;
    var o = _.filter(Items, {name: name})[0];
    var form = this.props.form;
    debugger
    var _this = this;
    var res = {};
    if(o.type == "ModalSelect"){
      form.getFieldInstance(o.name).resetMs();
    }
    if(o.type == "RModalSelect"){
      form.getFieldInstance(o.name).clear();
    }
    if(o.type == "RangePicker"){
      // _this.setState({isResetRangePicker: true}, function(){
      //   _this.setState({isResetRangePicker: false});
      // })
      res[name] = [];
      form.setFieldsValue(res);
    }
    // if(o.type == "DatePicker"){
    //   _this.setState({isResetDatePicker: true}, function(){
    //     _this.setState({isResetDatePicker: false});
    //   })
    // }
    // if(o.type == "MonthPicker"){
    //   _this.setState({isResetMonthPicker: true}, function(){
    //     _this.setState({isResetMonthPicker: false});
    //   })
    // }
    else{
      res[name] = "";
      form.setFieldsValue(res);
    }
  },
  getSpan(c){
    c = parseInt(c);
    if(c < 25 && c > 0)
    return 24 / c;
  },
  render() {
    const layoutCount = this.props.rowLayoutCount;
    const span = this.getSpan(layoutCount)
    const { getFieldDecorator } = this.props.form;
    const children = [];
    let Items = this.props.Items;
    for (let i = 0; i < Items.length; i++) {
      var item = this.getItem(Items,i,getFieldDecorator,formItemLayout);
      children.push(
        <Col span={span} key={i}>
            {item}
        </Col>
      );
    }

    const expand = this.state.expand, isShowQuery = this.state.isShowQuery;
    const showCount = expand ? children.length : this.props.listShowCount;
    var _height = expand ? Math.ceil(showCount/layoutCount)*48: Math.ceil(this.props.listShowCount/layoutCount)* 48;
    isInit = true;
    return (
      <Form
        layout="horizontal"
        // horizontal
        className="ant-advanced-search-form"
        onSubmit={this.onSubmit}
      >
        <Row gutter={40} style={{height: _height}} >
          {children}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">{this.props.btnSubmitLabel}</Button>
            <Button style={{ marginLeft: 8 }} onClick={(...arg)=> {
              this.reset(...arg);
              this.setState({isReflesh: true},function(){
                this.setState({isReflesh: false});
              })
            }}>
              {this.props.btnResetLabel}
            </Button>

            {
              children.length>4?
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggleExpand}>
                {expand ? "收起" : "更多"} <Icon type={expand ? 'up' : 'down'} />
              </a>:
              null
            }
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggleShowQuery}>
              {isShowQuery ? "收起查询条件" : "显示查询条件"} <Icon type={isShowQuery ? 'up' : 'down'} />
            </a>
            <QueryParamsLabel ref="qpl" resetItem={this.resetItem} style={{height: isShowQuery? 41: 0}} params={this.state.params} />
          </Col>
        </Row>
      </Form>
    );
  }
}));

module.exports = HHQueryForm;
