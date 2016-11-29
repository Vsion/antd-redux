import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
import Select from '../Select/Select';
import { HHMonthPicker, HHDatePicker, HHRangePicker } from '../HHDatePicker/HHDatePicker';

require('./HHQueryForm.scss');

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const HHSearchForm = Form.create()(React.createClass({
  getInitialState(){
    return {
      expand: false,
    };
  },
  toggle() {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  },
  getItem(Items,i,getFieldDecorator){
    var name = Items[i].name;
    if(Items[i].type == "input"){
      return(
        <FormItem {...formItemLayout} label={Items[i].label}>
          {getFieldDecorator(name)(
            <Input placeholder={Items[i].placeholder || "请选择"} />
          )}
        </FormItem>)
    }
    else if(Items[i].type == "select"){
      return(
        <FormItem {...formItemLayout} label={Items[i].label}>
          {getFieldDecorator(name)(
            <Select width={200} placeholder="请选择" options={Items[i].options} />
          )}
        </FormItem>)
    }
    else if(Items[i].type == "RangePicker"){
      return(
        <FormItem {...formItemLayout} label={Items[i].label}>
          {getFieldDecorator(name, {
             rules: [{ type: 'array' }],
             getValueFromEvent : (date, dateString) => {
               return dateString
             }
           })(
             <HHRangePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} disabledDate={Items[i].disabledDate || null} disabledTime={Items[i].disabledTime || null} onChange={Items[i].onChange || null} />
           )}
         </FormItem>)
    }
    return null;
  },
  render() {
    const { getFieldDecorator } = this.props.form;

    const children = [];
    let Items = this.props.Items;
    for (let i = 0; i < Items.length; i++) {
      var item = this.getItem(Items,i,getFieldDecorator);
      children.push(
        <Col span={8} key={i}>
            {item}
        </Col>
      );
    }

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 6;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={(...arg)=> {
          this.props.Search(...arg,this.props.form);
        }}
      >
        <Row gutter={40} >
          {children.slice(0, shownCount)}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">{this.props.btnSubmit}</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.props.handleReset}>
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


module.exports = HHSearchForm;
