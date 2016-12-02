import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import Select from '../Select/Select';
import ModalSelect from '../hhModalSelect/index';
import { HHMonthPicker, HHDatePicker, HHRangePicker } from '../HHDatePicker/HHDatePicker';

require('./HHQueryForm.scss');

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
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
        Reset={this.props.Reset}
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
      expand: false,
      isReflesh: false,
    };
  },
  componentDidUpdate(){
    //debugger
  },
  toggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  },
  componentDidMount() {
    // debugger
    //console.log(this.refs.ms);
    this.getRefs();
  },
  getRefs(){
    formRefs=this.refs;
  },
  getItem(Items,i,getFieldDecorator){
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
                <ModalSelect size="large" ref={Items[i].ref} onChange={onChange} placeholder={Items[i].placeholder} option={Items[i].opt} defaultMsValue={Items[i].defaultValue}/>
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
    this.props.form.validateFields((err, fvalues) => {
      var values = fvalues;debugger
      this.props.Items.map(function(o,i,objs){
        if(o.type == "ModalSelect"){
          values = Object.assign(values, fvalues[o.name]);
          //values.ms = null;
          delete values[o.name];
        }
      });
      this.props.Search(values);
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;

    const children = [];
    let Items = this.props.Items;
    for (let i = 0; i < Items.length; i++) {
      var item = this.getItem(Items,i,getFieldDecorator);
      children.push(
        <Col span={6} key={i}>
            {item}
        </Col>
      );
    }

    const expand = this.state.expand;
    const shownCount = expand ? children.length : this.props.showCount;
    var _height = expand ? Math.ceil(shownCount/4)*48: 48;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.onSubmit}
      >
        <Row gutter={40} style={{height: _height}} >
          {children}{/*{children.slice(0, shownCount)}*/}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">{this.props.btnSubmit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={(...arg)=> {
              this.props.Reset(...arg,this.props.form);
              this.setState({isReflesh: true},function(){
                this.setState({isReflesh: false});
              })
            }}>
              {this.props.btnReset}
            </Button>
            {
              children.length>6?
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                更多 <Icon type={expand ? 'up' : 'down'} />
              </a>:
              null
            }
          </Col>
        </Row>
      </Form>
    );
  }
}));

module.exports = HHQueryForm;
