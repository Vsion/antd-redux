import common from 'svc2Src/util/js/common';
import React from 'react';
import {render} from 'react-dom';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

import Grid from 'svc2Src/components/HHGridlist/index';
import $ from 'jquery';
import HHPanel from 'svc2Src/components/HHPanel/HHPanel';
import HHQueryForm from 'svc2Src/components/HHQueryForm/HHQueryForm';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactEcharts from 'echarts-for-react';

require('svc2Src/util/css/common.scss');

let gridData = [
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"},
  {col0:"1",col1:"2",col2:"3"}
]

let options = [];
for(var i = 0; i< 6; i++ ){
  options.push({value: i.toString(), key:i, text: i + "测试"});
}

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
};
const defaultValue = {
  "ICP.web" : "a0",
  "ICP.web1" : "b2"
};

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
let opt = {
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

const rmsoptions = {
  list: [
    {id: "a0", type: "level0", label: "A0", pid: ""},
    {id: "a1", type: "level1", label: "A1", pid: "a0"},
    {id: "a2", type: "level0", label: "A2", pid: ""},
    {id: "a3", type: "level2", label: "A3", pid: "a1"},
    {id: "a4", type: "level3", label: "A4", pid: "a3"},
  ],
  type: ["level0", "level1", "level2", "level3"],
  defaultValue: {level0: "a0,a2", "level2": "a3"},
}

const items = [
  {name: "rms",ref: "rms", placeholder: "请选择", label: "RModalSelect", type: "RModalSelect", opt: rmsoptions},
  {name: "range", label: "range", type: "RangePicker", initialValue: ["2017-01-01 00:00:00", "2017-01-02 00:00:00"]},
  {name: "date", label: "date", type: "DatePicker", initialValue: "2017-01-01 00:00:00"},
  {name: "month", label: "month", type: "MonthPicker"},
  {name: "ms",ref: "ms", placeholder: "请选择", label: "ModalSelect", type: "ModalSelect", opt: opt,initialValue: defaultValue},

  {name: "input", label: "label7", placeholder: "placeholder", type: "Input"},
  {name: "select", label: "select", placeholder: "placeholder8", type: "Select",
   options: options
  },
  {name: "input1", label: "label1", placeholder: "placeholder1", type: "Input", initialValue: "123"},
  {name: "input2", label: "label2", placeholder: "placeholder2", type: "Input", initialValue: "123"},
  {name: "input3", label: "label3", placeholder: "placeholder3", type: "Input"},
  {name: "input4", label: "label4", placeholder: "placeholder4", type: "Input"},
  {name: "input5", label: "label5", placeholder: "placeholder5", type: "Input"},
];

const echartsOption = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
        }
    ]
};
function onSubmit(values){
  console.log('Received values of form: ', values);
  console.log('Received values of form(str): ', JSON.stringify(values));
};
function onReset(){

};
const App = React.createClass({
  getInitialState(){
    return {
      CheckList :[{header: "查询框", key: "1", children:
                  <HHQueryForm
                    ref="qf"
                    Items={items}
                    onSubmit={onSubmit}
                    onReset={onReset}
                    btnSubmitLabel="查询"
                    btnResetLabel="重置"
                    listShowCount={5}
                    rowLayoutCount={4} />}],
      ChartList :[{header: "echarts", key: "1", children:
                  <ReactEcharts
                    option={echartsOption}
                    style={{height: '350px', width: '100%'}}
                    className='react_for_echarts' />}],
      PanelList2 :[{header: "表格", key: "1", children:
                   <Grid ref="grid1" option={gridOpt} />},
                   {header: "测试Panel2", key: "2", children:
                   <div>这是一个测试的child</div> }],
    }
  },
  render() {
    return (
      <div className="container">
        <HHPanel ref="a" itemName="1" PanelList={this.state.CheckList} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel ref="b" itemName="2" PanelList={this.state.ChartList} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel ref="c" itemName="3" PanelList={this.state.PanelList2} defaultActiveKey="1" onChange={this.onChange} />
      </div>
    );
  },
  componentDidMount() {
    //debugger
    //console.log(this.refs.qf.getRefs());
  }
});

module.exports = App;
