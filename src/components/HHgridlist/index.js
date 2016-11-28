import React from 'react';
import $ from "./jquery.hhdata.gridlist";
import "./jquery.hhdata.gridlist.css";

export default class Grid extends React.Component{
  constructor (props){
    super(props);
  }
  componentDidUpdate(props) {
    let pOpt = props.option;
    let gInst =this.inst;
    let loadMode = gInst.getLoadMode();

    //更新表格数据
    if (loadMode.hasUrl) {
      gInst.loadData()
    }else if(pOpt.table.data){
      gInst.updateData(pOpt.table.data)
    }

  }
  componentDidMount() {
    this.inst = $(this.refs.dom).gridList(this.props.option);
  }
  componentWillUnmount() {
    console.log('grid destory');
  }
  getInst(){
    return this.inst;
  }

  render(){
    return (
      <div>
        <table ref="dom"></table>
      </div>
    )
  }
}
