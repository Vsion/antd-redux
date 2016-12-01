import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Button } from 'antd';
import $ from 'jquery';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import getCarrier from 'svc2Src/util/js/Carrier';
import HHGrid from 'svc2Src/components/HHGrid_test/HHGrid';
let carrier;

//数据
let data = [];
let rest;

const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.tableData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const App = React.createClass({
  getInitialState(){
    carrier = getCarrier(this.props.actions,[]);
    return {}
  },

  render() {
    return (
      <div>
        <HHGrid />
          <HHGrid />
            <HHGrid />
              <HHGrid />
      </div>
    );
  },
  // componentDidMount(){
  //   $(".ant-table-header").attr("style","overflow-y:hidden !important;border-bottom: 5px solid #e5e5e5;padding-bottom: 0 !important");
  // }
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(App);
