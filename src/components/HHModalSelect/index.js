import React from 'react';
import $ from "./jquery.hhmodalselect";
import "./jquery.hhmodalselect.css";
import "./react.hhmodalselect.scss";
import {Input,Checkbox} from 'antd';

export default class ModalSelect extends React.Component{
  constructor (props){
    super(props);
  }
  componentDidUpdate(props) {
    let pOpt = props.option;
    let inst =this.inst;
    inst.updateData(props.option.data)
  }
  componentDidMount() {
    this.inst = $(this.refs.dom.refs.input).hhModalSelect(this.props.option);
    this.inst.setDefalutVal();
    let $clearBtn = this.inst.getDoms()[1].$clearBtn;
    let $submit = this.inst.getDoms()[1].$submit;
    let $cancel = this.inst.getDoms()[1].$cancel;
    $clearBtn.addClass('ant-btn');
    $submit.addClass('ant-btn ant-btn-primary');
    $cancel.addClass('ant-btn');
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
  render(){
    let props = this.props;
    let outInps = props.option.outputDom || [];
    let defaultValue = props.defaultValue || {};
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
      ref : "dom"
    }
    // let inpProps = Object.assign({} ,props,{ ref : "dom" ,"defaultValue":""});
    let sourceInp = React.createElement(Input, inpProps)
    return (
      <div>
        {sourceInp}
        {renderInps}
      </div>
    )
  }
}
