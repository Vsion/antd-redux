import React from 'react';
import { Menu, Icon } from 'antd';
import _ from 'lodash';
import MinNavItem from './MinNavItem';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes,
    openKeys : state.openKeys,
    isPack : state.isPack
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const MinNav = React.createClass({
  render() {
    const _this = this;
    const nodes = _.filter(this.props.nodes, { 'level': 0, 'pkey': '' }) || [];
    const list = nodes.map(function(node) {
      return (
        <MinNavItem
          key = {node.key}
          itemKey = {node.key}
          icon = {node.icon}
        />
      );
    });
    return (
      <div id="minNav" style={{left:(!this.props.isPack?-70:0)}}>
        {list}
      </div>
    );
  },
});


module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(MinNav);
