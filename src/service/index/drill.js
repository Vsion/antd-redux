import React from 'react';

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

const Drill = React.createClass({
  handleClick() {
    this.props.action.deepLinkTo(this.props.drillKey);
  },
  render() {
    <a onclick={this.handleClick} drillKey={this.props.drillKey}>我要下钻</a>
  }
})

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(Drill);
