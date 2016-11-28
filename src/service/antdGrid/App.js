import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Table, Button } from 'antd';
import $ from 'jquery';
require('./grid.scss');

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;

//数据
let data = [];
const id = "table_" + new Date().getTime();

const width = 100;
const defaultWidth = 83;
//分页
const pagination = {
  total: data.length,
  showSizeChanger: true,
  onShowSizeChange(current, pageSize) {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange(current) {
    console.log('Current: ', current);
  },
};
const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.tableData,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}
let columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    sorter: function(a, b){
      var arr = [a.name,b.name];
      arr.sort(function(aa, bb){return (aa + '').localeCompare(bb + '')});
      if(arr[0] == a.name){
        return 1;
      }else {
        return -1;
      }
    },
    render: function(text, record, index){
      return <div style={{width: 83}}>{text}</div>;
      }
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
      render: function(text, record, index){
        return <div style={{width: 83}}>{text}</div>;
      }
    },
    {
      title: 'Column 1',
      width: width,
      dataIndex: 'email',
      key: '1',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 2',
      width: width,
      dataIndex: 'email',
      key: '2',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;

      }
    },
    {
      title: 'Column 3',
      width: width,
      dataIndex: 'email',
      key: '3',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 4',
      width: width,
      dataIndex: 'email',
      key: '4',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 555555555',
      width: width,
      dataIndex: 'email',
      key: '5',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 6',
      width: width,
      dataIndex: 'email',
      key: '6',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 7',
      width: width,
      dataIndex: 'email',
      key: '7',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 8',
      width: width,
      dataIndex: 'email',
      key: '8',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 9',
      width: width,
      dataIndex: 'email',
      key: '9',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Column 10',
      width: width,
      dataIndex: 'email',
      key: '10',
      render: function(text, record, index){
        return <div style={{width: defaultWidth}}>{text}</div>;
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: ()=><a href="#">action</a>,
    }
];

const bindDrag = function (reactObj){
    let $head = $("#" + id + " .ant-table-header"),$wraper = $("#" + id + " .ant-table"),
    isDraging = false,$currTd,dragX;
    //清除之前绑定的事件
  	$head.off(".drag");
  	$wraper.off(".drag");
  	//绑定事件
  	$head.on("mousedown.drag",".resize-handler",function(e){
  			startDrag(e);
  			e.stopPropagation();
  	})
  	$wraper.on({
  			"mousemove.drag":function(e){
  					draging(e);
  			},
  			"mouseleave.drag":function(e){
  					endDrag(e);
  			},
  			"mouseup.drag":function(e){
  					endDrag(e);
  			}
  	})

  	//开始拖拽
  	var startDrag = function(e){
  			if(isDraging) return;
  			isDraging = true;
  			$currTd = $(e.target).parents("th");//当前td
  			dragX = e.clientX || e.pageX;
  			document.body.onselectstart = function(){return false};//禁止浏览器默认选中行为
  			e.stopPropagation();
  	}
  	//结束
  	var endDrag = function(e){
  			if(!isDraging) return;
  			isDraging = false;
  			document.body.onselectstart = function(){return true};//解除浏览器默认选中行为
  			e.stopPropagation();
  	};
  	//拖拽中
  	var $gridData = $wraper;//.find(".grid-body .grid-data");  //右半边表格，需要在draging中判断其宽度
  	var draging = function(e){
  			if(!isDraging) return;
  			var X = e.clientX || e.pageX;
  			var w = X-dragX;
  		  if($gridData.outerWidth() < 120 && w > 0) return ;
  			resizeCol($currTd,w);
  			dragX = X;
  			//_refreshScroll();
  			//_aynScrollLeft();//同步上下容器滚动偏移
  			e.stopPropagation();
  			e.preventDefault();
  	};

  	var resizeCol = function($th,w){
      var headName = $th.text(),idx;
      columns.map(function(column,i,cols){
        if(column.title == headName){
          idx = i//i+1
        }
      });
      if(w != 0){
        var ruleWidth = 40;//列宽最小值
        var width = columns[idx].width + w;
        if(width < ruleWidth){
          width = ruleWidth;
          w = ruleWidth - columns[idx].width;
        }
        columns[idx].width = width;//最终width

        var scrollX = reactObj.state.scrollX + w;//改变列宽同时需要改变表格scrollX
        if(scrollX < ($(".ant-table-body").width() - 16)){//当拖拽到最小值时
          scrollX = $(".ant-table-body").width() - 17;
          isDraging = false;
          var fullWidth = 0;
          columns.map(function(o,i,objs){
            if(i != idx){
              fullWidth += o.width;
            };
          })
          columns[idx].width = scrollX - fullWidth;
        }
    		reactObj.setState({columns: columns , scrollX: scrollX}, function(){
          console.log("noreturn");
          var width = columns[idx].width - 17;
          $th.find("span").width(width);
          $("#" + id + " .ant-table-thead th").each(function(i,o){
            if($(o).text() == headName){
              $(o).find("span").width(width);
              //return false;
            }
          })
          var $tableDiv = $("#" + id);
          var $tableDivStyle = $("#" + id + " style");
          var name = "#" + id + " .ant-table-tbody td:nth-child(" + (idx+1+reactObj.state.isSelect) + ")";
          var style = name + " div{width: " + (width) + "px !important}";
          if(!!$tableDivStyle && $tableDivStyle.length > 0){
            $tableDivStyle.append(style);
          }else{
            $tableDiv.append("<style>" + style + "</style>");
          }
        });
      }
      console.log("w: " + w);
      console.log("width: " + columns[idx].width);
  	};
    return resizeCol;
}
let setDefaultWidth = function(){
  let text = "",width = 0;
  for(var i = 0;i < columns.length;i ++){
    if(!!!columns[i].width){
      text = columns[i].title;
      break;
    }
  }
  $("#" + id + " .ant-table-thead th").each((i,ele)=>{
    let thisText = $(ele).text()
    if(thisText == text){
      width = $(ele).width();
    }
  });
  for(var i = 0;i < columns.length;i ++){
    $("#" + id + " .ant-table-thead th").each(function(j,o){
      if($(this).text() == columns[i].title){
        $(this).find("span").width(columns[i].width - 17);
      }
    })
  }
}

function onShowSizeChange(current, pageSize) {
  console.log(arguments);
}

const App = React.createClass({
  getInitialState(){
    carrier = getCarrier(this.props.actions,[]);
    this.props.actions.getData();
    return {
      scrollX:1300,
      columns: columns,
      pagination: {
        showTotal: function(){//这里this 指向pagination组件
          return "共 " + this.total + " 个" },
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,//改变页数change 函数
        showQuickJumper: true,
      },
      size: 'default',
      rowSelection: {},
      loading: true,
      isSelect: 1,//如果有行选择 则值为1 如果没有值为0

    }
  },

  render() {
    return (
      <div id={id}>
        <Table {...this.state} total={this.props.tableData.length} showTotal={total => `共 ${total} 个`} bordered={true} scroll={{ x: this.state.scrollX, y: 300 }} dataSource={this.props.tableData} />
      </div>
    );
  },
  componentDidMount(){
    $("#" + id + " .ant-table-thead th").append("<div class='resize-handler' style='height:" +
      $("#" + id + " .ant-table-thead tr").height()
     + "px'></div>");
     var resize = bindDrag(this);
     var arrTitle = [];
     for(var i = 0;i < columns.length; i++){
       if(!!columns[i].width){
         arrTitle.push(columns[i].title);
       }
     }
     var _this = this;
     setTimeout(function(){
       setDefaultWidth();
       _this.setState({loading: false});
     },500);
     //动态设置scrollX
     let scrollX = 0;
     this.state.columns.map(function(o,i,objs){
       if(!!o.width){
         scrollX += o.width;
       }
     })
     this.setState({scrollX: scrollX + 2});
     //右侧固定列高度  下方有滚动条
     //$("#" + id + " .ant-table-body-outer").height($("#" + id + " .ant-table-body-outer").height() + 17);
  }
});

module.exports = connect(
  mapStateToProps,mapDispatchToProps
)(App);
