import React from 'react';
import { Menu, Icon } from 'antd';
import $ from 'jquery';
import _ from 'lodash';
const SubMenu = Menu.SubMenu;

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nodes: state.nodes,
    openKeys : state.openKeys,
    activeKey : state.activeKey,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

var tempKey = "";
const Nav = React.createClass({
  handleClick(e) {
    if(!!e.key && e.key != this.props.current){
      var isAppend = true;
      this.props.actions.setActiveKey({ activeKey: e.key });
    }
  },
  onOpenChange(openKeys) {
    var b = false;
    openKeys.map(function(item) {
      if(item == tempKey){
        b = true;
      }
    })
    if(b){
      this.props.actions.setOpenKeys({ openKeys: this.getKeyPath(openKeys[(openKeys.length - 1)])});
    }else{
      this.props.actions.setOpenKeys({ openKeys: openKeys});
    }
  },
  getKeyPath(key) {
    var openKeys = [];
    var node =  _.filter(this.props.nodes, { key: key })[0] || {};
    while(node.level > -1){
        openKeys.push(node.key);
        node = _.filter(this.props.nodes, { key: node.pkey })[0] || {};
    }
    return openKeys;
  },
  getItem(allNodes,key,level) {
    const _this = this;
    level = parseInt(level) + 1;
    const tempNodes = _.filter(allNodes, { 'level': level, 'pkey': key }) || [];
    const list = tempNodes.map(function(node) {
      var itemList = {};
      if(node.url == ""){
        itemList = _this.getItem(allNodes,node.key,node.level);
        return(
          <SubMenu onTitleClick={_this.titleClick} key={node.key} title={<span><Icon type={node.icon} /><span>{node.title}</span></span>}>
            {itemList}
          </SubMenu>
        )
      }else{
        return(
          <Menu.Item key={node.key}><Icon type={node.icon} />{node.title}</Menu.Item>
        )
      }
    });
    return list;
  },
  titleClick() {
    tempKey = arguments[0].key;
  },
  render() {
    const allNodes = this.props.nodes;
    const _this = this;
    const nodes = _.filter(this.props.nodes, { 'level': 0, 'pkey': '' }) || [];
    const list = nodes.map(function(node) {
      const itemList = _this.getItem(allNodes,node.key,node.level);
      return (
          <SubMenu onTitleClick={_this.titleClick} key={node.key} title={<span><Icon type={node.icon} /><span>{node.title}</span></span>}>
            {itemList}
          </SubMenu>
      );
    });
    return (
      <Menu
        mode="inline"
        openKeys={this.props.openKeys}
        selectedKeys={[this.props.activeKey]}
        style={{ width: 240, height: "calc(100% - 40px)", position:"absolute"}}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        {list}
      </Menu>
    );
  },
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(Nav);
