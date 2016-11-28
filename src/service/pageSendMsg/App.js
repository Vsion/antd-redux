import React from 'react';
import { createStore } from 'redux';

import {Button, Icon } from 'antd';

require('svc2Src/util/css/common.scss');

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import getCarrier from 'svc2Src/util/js/Carrier';

let carrier;

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.text
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(class App extends React.Component {
  constructor (props) {
    super(props);
    carrier = getCarrier(this.props.actions,['testGetCarrier'])
  }
  onClick (){
    var _this = this;
    var number = parseInt(Math.random()*100).toString();
    carrier.dispatch({
      params: number,
      fnName: "testGetCarrierFn",
      tag: "testGetCarrier",
    });
  }
  render() {
    return (
        <div className="bodyDiv">
          linkTo page Tab3[loading测试页面] + 看这里 <span style={{fontSize: "20px"}}>{this.props.text}</span>
          <Button onClick={this.onClick}><Icon type="search" />点击</Button>
        </div>
    );
  }
})
