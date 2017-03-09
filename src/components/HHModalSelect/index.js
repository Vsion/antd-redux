import React from 'react';
import $ from "./jquery.hhmodalselect";
import "./jquery.hhmodalselect.css";
import "./react.hhmodalselect.scss";
import {Input,Checkbox} from 'antd';

let isInit = false, text = "";
export default class ModalSelect extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      isReset: props.isReset,
    }
  }
  componentDidUpdate(props) {
    let pOpt = props.option;
    let inst =this.inst;
    //inst.setValByProps(inst.getVal());
    inst.setVal();
    //inst.updateData(props.option.data);
    //原reset方法//修改state
    // if(this.props.isReset){
    //   inst.reset();
    //   defaultValue = {};
    // }
  }
  componentDidMount() {
    let onModalSubmit = this.props.option.onModalSubmit;
    let onModalCancel = this.props.option.onModalCancel;
    let option = Object.assign(this.props.option,{
      onModalSubmit:()=>{
        this.onSubmit();
        !!onModalSubmit && onModalSubmit();
      },
      onModalCancel: ()=>{
        this.onCancel();
        !!onModalCancel && onModalCancel();
      }})
    this.inst = $(this.refs.input.refs.input).hhModalSelect(option);
    this.inst.setDefalutVal();
    let $clearBtn = this.inst.getDoms()[1].$clearBtn;
    let $submit = this.inst.getDoms()[1].$submit;
    let $cancel = this.inst.getDoms()[1].$cancel;
    $clearBtn.addClass('ant-btn');
    $submit.addClass('ant-btn ant-btn-primary');
    $cancel.addClass('ant-btn');
    this.onChange(this.inst.getVal());//获取默认值
    // let _this = this;
    // $(this.refs.input.refs.input).on("click", function(){
    //   _this.onChange();
    // })
  }

  onSubmit(){
    this.onChange(this.inst.getVal())
    // this.setState({msObj: this.inst.getVal()});
  }
  onCancel(){
    this.onChange(this.inst.getVal())
  }
  resetMs(){
    this.inst.reset();
    //defaultValue = {};
  }
  componentWillUnmount() {
    this.dispose();
  }
  getInst(){
    return this.inst;
  }
  getVal(){
    return this.inst.getVal();
  }
  dispose(){
    this.inst.dispose();
  }
  onChange(value){
    // debugger
    // this.refs["input"].value = value || "";
    var val = this.inst.getSelectedItems().map(function(item){return item.label}).join(",")
    text = val;
    this.refs['input'].refs['input'].value = val || ""
  }
  onClick(){

  }
  resetFun(){
    return {};
  }
  render(){
    let props = this.props;
    let outInps = props.option.outputDom || [];
    let defaultValue = props.defaultMsValue || {};
    let renderInps = outInps.map((opt) => {
      let val = defaultValue[opt.name];
      return <input type="hidden" id={opt.id} name={opt.name} key={opt.id} defaultValue={val} />;
    });
    // if(!isInit){
    //   isInit = true;
    // }
    var inpProps = {
      type : props.type,
      id : props.id,
      value : text || "",
      size : props.size,
      disabled : props.disabled,
      addonBefore : props.addonBefore,
      addonAfter : props.addonAfter,
      onPressEnter : props.onPressEnter,
      autosize : props.autosize,
      defaultValue : "",
      ref : "input",
      placeholder: props.placeholder,
      onClick: this.onClick

    }
    // let inpProps = Object.assign({} ,props,{ ref : "input" ,"defaultValue":""});
    // let sourceInp = React.createElement(Input, inpProps)
    return (
      <div onChange={this.onChange}>
        <Input {...inpProps}/>
        {renderInps}
      </div>
    )
  }
}
