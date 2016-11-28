import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';

import Grid from 'svc2Src/components/HHGridlist/index';
import $ from 'jquery';

import HHCard from 'svc2Src/components/HHCard/HHCard';
import HHPanel from 'svc2Src/components/HHPanel/HHPanel';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

require('svc2Src/util/css/common.scss');

let gridData = [
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"}
]

let gridOpt = {
  height:400,
  table:{
    data:gridData,
    checkbox:true,
    enableNum:true,
    loadMode:"local_page_load",
    checkboxName:"indexStr",
  },
  cols:[
    {dragable:true,text:"col0",id:"col0",name:"col0",width:120},
    {dragable:true,text:"col1",id:"col1",name:"col1",width:120},
    {dragable:true,text:"col2",id:"col2",name:"col2",width:120}
  ],
  fixedTable:{
       fixedColName:['col0']
  },
  page:{
      pageSize:50
  }
}

const App = React.createClass({
  getInitialState(){
    return {
      PanelList: [{header: "测试Panel",
                  key: "1",
                  children: <div>这是一个测试的child</div>}],
      PanelList2: [{header: "测试Panel1",
                    key: "1",
                    children: <div>这是一个测试的child</div>},
                   {header: "测试Panel2",
                    key: "2",
                    children: <div>这是一个测试的child</div>}]
    }
  },
  render() {
    // this.state.PanelList2.map((x) => {
    //   debugger
    //   return x;
    // })
    return (
      <div>
        <HHCard style={{ width: 300}} extra={<a href="#">More</a>} title="这是一个卡片的标题" >
          <Grid ref="grid0" option={gridOpt} />
        </HHCard>
        <HHPanel style={{ width: 300}} PanelList={this.state.PanelList} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel style={{ width: 300}} PanelList={this.state.PanelList2} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel style={{ width: 300}} PanelList={this.state.PanelList} defaultActiveKey="1" onChange={this.onChange} />
      </div>
    );
  },
  componentDidMount(){

  }
});

module.exports = App;
