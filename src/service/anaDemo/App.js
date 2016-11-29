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

const options = [
  {value: "1", text: "111"},
  {value: "2", text: "222"},
  {value: "3", text: "333"},
  {value: "4", text: "444"},
  {value: "5", text: "555"},
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
};

const items = [

  {name: "date", label: "date", type: "RangePicker"},
  {name: "input7", label: "label7", placeholder: "placeholder7", type: "input"},
  {name: "input7", label: "label7", placeholder: "placeholder7", type: "select",
   options: options
  },
  {name: "input1", label: "label1", placeholder: "placeholder1", type: "input"},
  {name: "input2", label: "label2", placeholder: "placeholder2", type: "input"},
  {name: "input3", label: "label3", placeholder: "placeholder3", type: "input"},
  {name: "input4", label: "label4", placeholder: "placeholder4", type: "input"},
  {name: "input5", label: "label5", placeholder: "placeholder5", type: "input"},
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
const App = React.createClass({
  getInitialState(){
    return {
      CheckList: [{header: "查询框",
                  key: "1",
                  children:
                  <HHSearchForm
                    Items={items}
                    Search={this.Search}
                    Reset={this.Reset}
                    btnSubmit="查询"
                    btnReset="清空"
                   />}],
      GridList: [{header: "echarts",
                  key: "1",
                  children:   <ReactEcharts
                                option={echartsOption}
                                style={{height: '350px', width: '100%'}}
                                className='react_for_echarts' />}],
      PanelList2: [{header: "表格",
                    key: "1",
                    children: <Grid ref="grid0" option={gridOpt} />},
                     {header: "测试Panel2",
                      key: "2",
                      children: <div>这是一个测试的child</div>}],
    }
  },
  Search(e) {debugger
    e.preventDefault();
    arguments[3].validateFields((err, fvalues) => {
      var values = fvalues;
      // values = {
      //   ...fvalues,
      //   'range-time-picker': [
      //     fvalues["date"][0].format('YYYY-MM-DD HH:mm:ss'),
      //     fvalues["date"][1].format('YYYY-MM-DD HH:mm:ss'),
      //   ],
      // };
      console.log('Received values of form: ', values);
    });
  },

  Reset() {
    this.props.form.resetFields();
  },

  render() {
    return (
      <div className="container">
        <HHPanel PanelList={this.state.CheckList} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel PanelList={this.state.GridList} defaultActiveKey="1" onChange={this.onChange} />
        <HHPanel PanelList={this.state.PanelList2} defaultActiveKey="1" onChange={this.onChange} />
      </div>
    );
  },
  componentDidMount(){

  }
});

module.exports = App;
