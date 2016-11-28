import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import _ from 'lodash';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes,
    breadCrumb : state.breadCrumb,
    activeKey : state.activeKey
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

const Breadcrumbs = React.createClass({
  render() {
    const itemList = this.props.breadCrumb.items.map(function(item,i) {
      // if(i < length){
      //   return (<Breadcrumb.Item href={item.url} key={item.title}>{item.title}</Breadcrumb.Item>);
      // }else{
        return (<Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>);
      //}
    });
    return (
      <div className="breadDiv">
        <Breadcrumb>
          {itemList}
        </Breadcrumb>
      </div>
    );
  },
});


module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(Breadcrumbs);
