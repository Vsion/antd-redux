import React from 'react';
import Tabs from './Tabs';
import { Icon, Popconfirm, message, Button } from 'antd';
import Breadcrumb from './Breadcrumb';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const Container = React.createClass({
  logOut(e) {
    this.props.actions.logOut();
  },
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <Tabs />
        <Breadcrumb />
        <div className="logoutDiv">
          <Popconfirm placement="bottomRight" title="确定登出系统?" onConfirm={this.logOut} okText="Yes" cancelText="No">
            <Icon type="logout" style={{"fontSize":"19px"}} />
          </Popconfirm>
        </div>
      </div>
    );
  },
});


module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(Container);

//module.exports = Header;
