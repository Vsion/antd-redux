import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Button } from 'antd';
import {Loading,listener} from 'svc2Src/components/Loading/Loading';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;


const mapStateToProps = (state, ownProps) => {
  return {
    text: state.text,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

let fn;

const App = React.createClass({
  getInitialState(){
    carrier = getCarrier(this.props.actions,['testGetCarrier']);
    // fn = () => {
    //   this.setState({loading:true})
    //   return this.props.actions.asyncFn().then(
    //     ()=>{
    //       this.setState({loading:false})
    //     }
    //   );
    // }

    return {color: "#fff",loading: false,text: "222"};
  },
  onClick() {
    if(this.state.color == "#fff"){
      this.setState({color: "#ccc"});
    }
    if(this.state.color == "#ccc"){
      this.setState({color: "#1ff"});
    }
    if(this.state.color == "#1ff"){
      this.setState({color: "#fff"});
    }

    listener(this.props.actions.asyncFn,"start","ok");
    //this.props.actions.asyncFn("start","ok");
  },
  handleLoading() {
    this.onClick();
  },
  onChange(){
    this.setState({text: arguments[0].currentTarget.value});
  },
  render(){
    return (
      <div>
        <Loading >
          <div className="LoadDiv">
            这是一个title 为 Tab3 的h5 页面
            <input style={{fontSize: "20px"}} onChange={this.onChange} value={this.props.text}/>
            <input />
            <input placeholder="点我就变色" style={{background: this.state.color}} onClick={this.onClick} />
            <input />
            <input />
          </div>
        </ Loading>
          <Button onClick={this.handleLoading}>toggleLoading</Button>
      </div>
      )
    }
  })

  module.exports = connect(
    mapStateToProps,mapDispatchToProps
  )(App);;
