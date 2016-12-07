import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import Select from '../Select/Select';
import QueryParamsLabel from './QueryParamsLabel';

import ModalSelect from '../hhModalSelect/index';
import { HHMonthPicker, HHDatePicker, HHRangePicker } from '../HHDatePicker/HHDatePicker';

require('./HHQueryForm.scss');

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
let onChange = (msObj)=>{
  //debugger
}
let formRefs;
const HHQueryForm = React.createClass({
  getRefs(){
    return formRefs;
  },
  render(){
    return (
      <HHForm
        ref="Form"
        Items={this.props.Items}
        Search={this.props.Search}
        btnSubmit={this.props.btnSubmit}
        btnReset={this.props.btnReset}
        showCount={this.props.showCount}
       />
    )
  }
});
const HHForm = Form.create()(React.createClass({
  getInitialState(){
    return {
      expand: true,
      isReflesh: false,
      isReset: false,
      isShowQuery: true,//this.props.isShowQuery,
      params: [],
      isSearching: false,
    };
  },
  componentDidUpdate(){
    //debugger
  },
  toggleExpand() {
    this.setState({ expand: !this.state.expand });
  },
  toggleShowQuery() {
    this.setState({ isShowQuery: !this.state.isShowQuery });
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
    switch (Items[i].type) {
      case "Input":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name)(
              <Input onChange={onChange} placeholder={Items[i].placeholder || "请选择"} />
            )}
          </FormItem>)
        break;
      case "Select":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name)(
              <Select placeholder="请选择" options={Items[i].options} />
            )}
          </FormItem>);
        break;
      case "RangePicker":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'array' }],
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHRangePicker isReflesh={this.state.isReflesh} format="YYYY-MM-DD HH:mm:ss" showTime={true} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} /> : null
             )}
           </FormItem>);
        break;
      case "DatePicker":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'string' }],
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHDatePicker isReflesh={this.state.isReflesh} format="YYYY-MM-DD" showTime={false} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} /> : null
             )}
           </FormItem>);
        break;
      case "MonthPicker":
        return(
          <FormItem {...formItemLayout} label={Items[i].label} title={Items[i].label}>
            {getFieldDecorator(name, {
               rules: [{ type: 'string' }],
               getValueFromEvent : (date, dateString) => {
                 return dateString
               }
             })(
              <HHMonthPicker isReflesh={this.state.isReflesh} format="YYYY-MM" showTime={true} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} /> : null
             )}
           </FormItem>);
        break;
      case "ModalSelect":
        return(
          <FormItem {...formItemLayout} label={Items[i].label}>
            {/*}{getFieldDecorator(name, {
               rules: [{ type: 'string' }],
               getValueFromEvent : (date, dateString) => {
                 return dateString
               },
               getFieldDecorator: Items[i].defaultValue,
             })(

             )}*/}
             {getFieldDecorator(name)(
                <ModalSelect isReset={this.state.isReset} size="large" onChange={onChange} placeholder={Items[i].placeholder} option={Items[i].opt} defaultMsValue={Items[i].defaultValue}/>
             )}
           </FormItem>);
        break;

      default:
        return null;
        break;
    }
  },
  onSubmit(e){
    e.preventDefault();
    let _this = this;
    this.props.form.validateFields((err, fvalues) => {
      var values = fvalues;
      this.props.Items.map(function(o,i,objs){
        if(o.type == "ModalSelect"){
          values = Object.assign(values, fvalues[o.name]);
          //values.ms = null;
          delete values[o.name];
        }
      });
      _this.props.Search(values);
      _this.setParams(values);
    });
    this.setState({isSearching: true}, function(){
      this.setState({isSearching: false});
    })
  },
  setParams(values){
    var items = [];
    for(var i = 0;i < this.props.Items.length; i++){
      var o = this.props.Items[i];
      if(o.type == "ModalSelect"){
        var msItems = this.props.form.getFieldInstance(o.name).inst.getSelectedItems(),value = "";
        msItems.map(function(obj,i,objs){
          if(!!value) value += ","
          value += obj.label;
        });
        items.push({label: o.label, name: o.name, value: value})
      }
      else if(!!values[o.name]){
        if(o.type == "RangePicker"){
          items.push({label: o.label, name: o.name, value: values[o.name].join(" - ")})
        }else {
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
    // this.setState({isReset: true, params: []}, function(){
    //   this.setState({isReset: false});
    // });
    //组件实例.reset()
  },
  resetItem(name){
    let Items = this.props.Items;
    var form = this.props.form;
    Items.map(function(o,i,objs){
      if(o.name == name){
        if(o.type == "ModalSelect"){
          form.getFieldInstance(o.name).resetMs();
        }
        else{debugger
          form.resetFields([name]);
        }
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    let Items = this.props.Items;
    for (let i = 0; i < Items.length; i++) {
      var item = this.getItem(Items,i,getFieldDecorator,formItemLayout);
      children.push(
        <Col span={6} key={i}>
            {item}
        </Col>
      );
    }

    const expand = this.state.expand, isShowQuery = this.state.isShowQuery;
    const shownCount = expand ? children.length : this.props.showCount;
    var _height = expand ? Math.ceil(shownCount/4)*48: 48;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.onSubmit}
      >
        <Row gutter={40} style={{height: _height}} >
          {children}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">{this.props.btnSubmit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={(...arg)=> {
              this.reset(...arg);
              this.setState({isReflesh: true},function(){
                this.setState({isReflesh: false});
              })
            }}>
              {this.props.btnReset}
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
            <QueryParamsLabel isSearching={this.state.isSearching} resetItem={this.resetItem} style={{height: isShowQuery? 40: 0}} params={this.state.params} />
          </Col>
        </Row>
      </Form>
    );
  }
}));

module.exports = HHQueryForm;
