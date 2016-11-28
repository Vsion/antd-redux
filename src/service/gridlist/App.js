import React from 'react';

import { createStore } from 'redux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import getCarrier from 'svc2Src/util/js/Carrier';

import Grid from 'svc2Src/components/HHGridlist/index';
import $ from 'jquery';

import { Switch } from 'antd';


let carrier;
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

const mapStateToProps = (state, ownProps) => {
  return {
    gridOpt : state.gridOpt
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
    carrier = getCarrier(this.props.actions,['Grid'])
    this.state = {
      renderGrid : true,
      gridOpt : gridOpt
    }
  }
  onChange(e){
    this.setState({
      renderGrid : !this.state.renderGrid
    })
  }
  addData(e){
    let val = $(e.target).val();
    gridData.push({col0:val,col1:val,col2:val})
    gridOpt.table.data = gridData
    this.setState({
      gridOpt : gridOpt
    })
    console.log(this.refs.grid0.inst);
  }
  render() {
    let IGrid = (id) => {
      if (this.state.renderGrid) {
        return <Grid ref={id} option={this.state.gridOpt} />
      }else {
        return null;
      }
    }
    return (
      <div>
        <input type="text" ref="input" onChange={this.addData.bind(this)}  />
        <Switch defaultChecked={this.state.renderGrid} onChange={this.onChange.bind(this)}/>
        {IGrid("grid0")}
        {IGrid("grid1")}
      </div>
    );
  }
})
