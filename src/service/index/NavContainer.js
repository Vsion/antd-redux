import React from 'react';
import MinNav from './MinNav';
import Nav from './Nav';
import SearchNav from './SearchNav';

import { Icon } from 'antd';

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

const NavContainer = React.createClass({
  getInitialState() {
    return {
      isSearch: false
    }
  },
  handleToggleClick (){
    this.props.actions.toggleMenu({ isPack: !this.props.isPack});
    if(!this.props.isPack){//toggleMenu 有延迟所以对isPack做非处理
      this.setState({isSearch: false});
    }
  },
  handleSearchClick(){
    this.setState({isSearch: !this.state.isSearch});
  },
  onMinNavClick: () =>{
    this.props.actions.toggleMenu({ isPack: false})
  },
  render() {
    var toggleIcon = <Icon style={{transition: "all 1s", transform: "rotate(0deg)"}} type="menu-fold" />;
    if(!this.props.isPack){ toggleIcon = <Icon style={{transition: "all 1s", transform: "rotate(-180deg)"}} type="menu-fold" /> }
    var searchDiv = <SearchNav isSearch={this.state.isSearch} />;
    if(!this.state.isSearch){searchDiv = null};
    return (
      <div style={{height: "100%"}}>
        <div className="topToggle" style={{transition:"all .3s", width:(this.props.isPack?70:240)}}>
          <div className="nav-toggle"
            onClick={this.handleToggleClick}>
            { toggleIcon }
          </div>
          <div className="nav-search"
            style={{display:(this.props.isPack?"none":"block"), width:(this.props.isPack?0:70)}}
            onClick={this.handleSearchClick}>
            <Icon type="search" />
          </div>
        </div>
        <div
          style={{
            //display:(this.state.isSearch?"block":"none"),
            transition:"all .2s",
            width:"100%",
            height: (this.state.isSearch?30:0)
          }}>
          {searchDiv}
        </div>
        <div
          style={{
            position:"relative",
            opacity:(this.props.isPack?0:1),
            width:(this.props.isPack?0:240),
            height: "100%",
            top: 40
          }}>
          <Nav openkeys={this.props.openKeys} nodes={this.props.nodes} />
        </div>
        <div style={{transition:"all .3s", opacity:(this.props.isPack?1:0), width:(this.props.isPack?70:0)}}>
          <MinNav
            onClick={this.onMinNavClick} nodes={this.props.nodes} />
        </div>
      </div>
    );
  }
})

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(NavContainer);

//module.exports = NavContainer;
