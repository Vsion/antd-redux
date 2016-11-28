import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
require('./HHSF.scss');

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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const children = [];
    let Items = this.props.Items;
    for (let i = 0; i < Items.length; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormItem {...formItemLayout} label={Items[i].label}>
            {getFieldDecorator(Items[i].name)(
              <Input placeholder={Items[i].placeholder || "请选择"} />
            )}
          </FormItem>
        </Col>
      );
    }

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 6;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.props.handleSearch}
      >
        <Row gutter={40}>
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
