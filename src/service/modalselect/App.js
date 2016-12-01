import React from 'react';

import { createStore } from 'redux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import getCarrier from 'svc2Src/util/js/Carrier';

import ModalSelect from 'svc2Src/components/hhModalSelect/index';
import $ from 'jquery';

import { Switch } from 'antd';


let carrier;
let data =[
  {"id":"a0","name":"AA","label":"视频","children":[
       {"id":"a1","name":"AA1","label":"优酷","children":[
         {"id":"a11","name":"AA11","label":"电影","children":[]},
         {"id":"a12","name":"AA12","label":"电视剧","children":[]}
         ]},
       {"id":"a2","name":"AA2","label":"腾讯视频","children":[]},
       {"id":"a3","name":"AA3","label":"搜狐视频","children":[]}
  ]},
  {"id":"b0","name":"BB","label":"游戏","children":[
       {"id":"b1","name":"BB1","label":"单机游戏","children":[]},
       {"id":"b2","name":"BB2","label":"网络游戏","children":[]}
     ]},
  {"id":"c0","name":"CC","label":"小说","children":[]},
  {"id":"d0","name":"DD","label":"新闻","children":[]}
]
let msOpt = {
  data:data,
  keys:{
    id:"id",
    name:"name",
    label:"label",
    children:"children"
  },
  outputDom:[{level:"0",id:"aa0",name:"ICP.web"},
             {level:"1",id:"aa1",name:"ICP.web1"}]
}

const mapStateToProps = (state, ownProps) => {
  return {
    gridOpt : state.msOpt
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(class App extends React.Component {
  constructor (props) {
    super(props);
    carrier = getCarrier(this.props.actions,['hhms'])
    this.state = {
      msOpt : msOpt,
      defaultValue : {
        "ICP.web" : "a0",
        "ICP.web1" : "b2"
      }
    }
  }
  render() {
    return (
      <div>
        <ModalSelect size="large" placeholder="large size" option={this.state.msOpt} defaultValue={this.state.defaultValue}/>
      </div>
    );
  }
})
