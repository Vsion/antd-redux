import React from 'react';
import { Tabs } from 'antd';
import $ from 'jquery';
const TabPane = Tabs.TabPane;

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    panes: state.panes,
    activeKey: state.activeKey
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
  }
}
const HHTabs = React.createClass({
  getActiveKey(){
    const _this = this;var key = "";
    for(var i = 0;i < this.props.panes.length;i ++){
      const pane = this.props.panes[i];
      if(pane.menuKey === _this.props.activeKey){
        key = pane.key
      }
    }
    return key;
  },
  onChange(activeKey) {
    this.props.actions.changeActiveKey({ activeKey: activeKey });
  },
  onEdit(targetKey, action) {
    this[action](targetKey);
  },
  remove(targetKey) {
    let activeKey = this.props.activeKey;
    let lastIndex;
    this.props.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.props.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.props.actions.removeTab({panes: panes, activeKey: activeKey });
  },
  onLoad() {
    //debugger
    //console.log(arguments);
  },
  render() {

    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.getActiveKey()}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.props.panes.map(pane =>
          <TabPane ref={pane.key} tab={pane.title} key={pane.key}>
            <iframe onLoad={this.onLoad} src={pane.url}></iframe>
          </TabPane>)}
      </Tabs>
    );
  },
  componentDidMount() {
    $("div[role='tab'].ant-tabs-tab").each((i,ele)=>{
      let text = $(ele).text()
      if(text.indexOf("首页") > -1){
        $(ele).find("i.anticon-close.anticon").remove();
      }
    })
  }
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(HHTabs);
