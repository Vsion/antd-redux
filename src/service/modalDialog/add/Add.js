import common from 'svc2Src/../util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

import Modal from 'svc2Src/../components/HHModal/Modal';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import getCarrier from 'svc2Src/../util/js/Carrier';

const mapStateToProps = (state, ownProps) => {
  return {
    visible: state.visible,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const Add = React.createClass({
   getInitialState(){
     return {
       loading: false
     }
   },
   handleOk() {
     console.log("ok");
     this.setState({loading: true});
     let _this = this;
     setTimeout(function(){
       _this.setState({loading: false});
       _this.props.actions.toggleModal(false);
     },3000);
   },
   handleCancel(e) {
     debugger
     console.log("cancel");
     this.props.actions.toggleModal(false);
   },
   render() {
     return (
       <Modal title="标题" visible={this.props.visible}
         onOk={this.handleOk} onCancel={this.handleCancel}
         loading={this.state.loading}
         width="800px">
          <Form>
            <FormItem>
              <Input />
            </FormItem>
              <FormItem>
                <Input />
              </FormItem>
                <FormItem>
                  <Input />
                </FormItem>
                  <FormItem>
                    <Input />
                  </FormItem>
                    <FormItem>
                      <Input />
                    </FormItem>
                      <FormItem>
                        <Input />
                      </FormItem>
                        <FormItem>
                          <Input />
                        </FormItem>
                          <FormItem>
                            <Input />
                          </FormItem>
                            <FormItem>
                              <Input />
                            </FormItem>
                              <FormItem>
                                <Input />
                              </FormItem>
                                <FormItem>
                                  <Input />
                                </FormItem>
                                  <FormItem>
                                    <Input />
                                  </FormItem>
                                    <FormItem>
                                      <Input />
                                    </FormItem>
                                      <FormItem>
                                        <Input />
                                      </FormItem>
                                        <FormItem>
                                          <Input />
                                        </FormItem>
                                          <FormItem>
                                            <Input />
                                          </FormItem>
                                            <FormItem>
                                              <Input />
                                            </FormItem>
                                              <FormItem>
                                                <Input />
                                              </FormItem>
          </Form>
       </Modal>
     );
   },
   componentWillUnmount(){
     debugger
   },

});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(Add);
