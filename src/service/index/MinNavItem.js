import React from 'react';
import { Icon } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes,
    openKeys : state.openKeys
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const MinNavItem = React.createClass({
  getInitialState() {
    return {};
  },
  handleClick(e) {
    this.props.actions.toggleMenu({ isPack: false});
    this.props.actions.setOpenKeys({ openKeys: [this.props.itemKey]});
  },
  render() {
    return (
      <div onClick={this.handleClick}>
          <span><Icon type={this.props.icon} /></span>
      </div>
    );
  },
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(MinNavItem);
