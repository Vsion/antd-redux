import React from 'react';
import $ from "./jquery.hhmodalselect";
import "./jquery.hhmodalselect.css";
import "./react.hhmodalselect.scss";
import {Input,Checkbox} from 'antd';

let defaultValue;
export default class ModalSelect extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      msObj: props.defaultMsValue,
      isReset: props.isReset,
    }
    defaultValue = props.defaultMsValue || {};
  }
  componentDidUpdate(props) {

    let pOpt = props.option;
    let inst =this.inst;
    //inst.setValByProps(inst.getVal());
    inst.setVal();
    //inst.updateData(props.option.data);
    if(this.props.isReset){
      inst.reset();
      defaultValue = {};
    }
  }
  componentDidMount() {
    let onModalSubmit = this.props.option.onModalSubmit;
    let option = Object.assign(this.props.option,{onModalSubmit:()=>{
      this.onSubmit();
      !!onModalSubmit && onModalSubmit();
    }})
    this.inst = $(this.refs.input.refs.input).hhModalSelect(option);
    this.inst.setDefalutVal();
    let $clearBtn = this.inst.getDoms()[1].$clearBtn;
    let $submit = this.inst.getDoms()[1].$submit;
    let $cancel = this.inst.getDoms()[1].$cancel;
    $clearBtn.addClass('ant-btn');
    $submit.addClass('ant-btn ant-btn-primary');
    $cancel.addClass('ant-btn');
    this.props.onChange(this.inst.getVal());//获取默认值
  }
  onSubmit(){
    !!this.props.onChange && this.props.onChange(this.inst.getVal())
    // this.setState({msObj: this.inst.getVal()});
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

  }
  resetFun(){
    return {};
  }
  render(){
    let props = this.props;
    let outInps = props.option.outputDom || [];
    let renderInps = outInps.map((opt) => {
      let val = defaultValue[opt.name] || ""
      return <input type="hidden" id={opt.id} name={opt.name} key={opt.id} defaultValue={val} />;
    })
    var inpProps = {
      type : props.type,
      id : props.id,
      value : props.value,
      size : props.size,
      disabled : props.disabled,
      addonBefore : props.addonBefore,
      addonAfter : props.addonAfter,
      onPressEnter : props.onPressEnter,
      autosize : props.autosize,
      defaultValue : "",
      ref : "input",
      placeholder: props.placeholder
    }
    // let inpProps = Object.assign({} ,props,{ ref : "input" ,"defaultValue":""});
    // let sourceInp = React.createElement(Input, inpProps)
    return (
      this.props.isReset?
      <div onChange={this.props.onChange}>
        <Input {...inpProps} />
        {renderInps}
      </div>
      :
      <div value={this.state.msObj} onChange={this.props.onChange}>
        <Input {...inpProps} />
        {renderInps}
      </div>
    )
  }
}
