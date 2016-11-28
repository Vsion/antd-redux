import React from 'react';
import { AutoComplete } from 'antd';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isPack: state.isPack,
    nodes: state.nodes,
    openKeys: state.openKeys,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const SearchNav = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  onSelect(value) {
    console.log('onSelect', value);
    this.props.actions.selectNode(value);
  },
  handleChange(value) {
    if(!!!value){
      return;
    }
    // const nodes = this.props.nodes || [];
    // const arrTempValue = nodes.map(function(node) {
    //   var isShow = false;
    //   var tempTitle = node.title.toLowerCase();
    //   if(tempTitle.indexOf(value.toLowerCase()) > -1){
    //     isShow = true;
    //   }
    //   return ({
    //       title: node.title,
    //       key: node.key,
    //       isShow: isShow,
    //     }
    //   );
    // });
    // var arrValue = _.filter(arrTempValue, { 'isShow': true }) || [];
    // var arrTitle = arrValue.map(function(valueItem) {
    //   return(
    //     valueItem.title
    //   )
    // });
    var arrTitle = this.props.nodes.map(function(item) {
      return(
        item.title
      )
    }).filter(item => item.toLowerCase().indexOf(value.toLowerCase()) > -1);
    this.setState({
      //dataSource: arrTitle.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) === 0)
      dataSource: arrTitle,//!arrTitle.length ? ["未查找到"] :
    });
  },
  render() {
    return (
      <AutoComplete
        dataSource={this.state.dataSource}
        filterOption={false}
        style={{ width: '100%' }}
        onSelect={this.onSelect}
        onChange={this.handleChange}
      />
    );
  },
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(SearchNav);
