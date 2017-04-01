import React from 'react';
import { Input ,Checkbox} from 'antd';
import "./index.scss";
import Modal from '../HHModal/Modal';
import ModalContent from './ModalContent';

const RModalSelect = React.createClass({
  getInitialState(){
    let detaultSelectedItems = this.getDetaultSelectedItems(this.props.options.defaultValue || {}, this.props.options.list || []);
    let value = this.getValue(detaultSelectedItems);
    let inputValue = this.getInputValue(detaultSelectedItems);
    return {
      visible: false,
      loading: false,
      isFullModel: false,
      value: value,
      inputValue: inputValue,
      detaultSelectedItems: detaultSelectedItems
     };
  },
  getValue(selectedItems){
    var value = {};
    selectedItems.forEach(function(o, i){
      if(!!!value[o.type]){
        value[o.type] = o.id;
      }else{
        value[o.type] += "," + o.id;
      }
    })
    return value;
  },
  getInputValue(selectedItems){
    var inputValue = "";
    selectedItems.forEach(function(o, i){
      if(!!!inputValue){
        inputValue = o.label;
      }else{
        inputValue += "," + o.label;
      }
    });
    return inputValue;
  },
  getDetaultSelectedItems(defaultValue, list){
    var res = [];
    if(!!defaultValue && JSON.stringify(defaultValue) != "{}"){
      for(var name in defaultValue){
        var names = defaultValue[name].split(",");
        names.forEach(function(o, i){
          res.push(_.filter(list, {type: name, id:o})[0])
        });
      }
    }
    return res;
  },
  componentDidUpdate(props) {

  },
  componentDidMount() {

  },
  clear() {
    this.setState({value: {}, inputValue: "", detaultSelectedItems: []});
    this.refs.modalContent.setState({selectedItems: []});
  },
  onChange(value){

  },
  onClick(){
    if(!this.state.visible){
      //show panel
    }else{
      //hide panel
    }
    this.setState({visible: !this.state.visible});
  },
  handleOk(){
    this.getInputValueOnSubmit();
    !!this.refs.modalContent && this.refs.modalContent.confirm();
    !!this.props.onModalSubmit && (function(_this){
      var res = _this.props.onModalSubmit(_this.refs.modalContent.state.selectedItems, _this.refs.modalContent.state.list);
      _this.refs.modalContent.onModalSubmit(res);
    })(this);
    this.setState({inputValue: this.getInputValue(this.refs.modalContent.state.selectedItems)});
    this.closeModal();
  },
  handleCancel(){
    this.reset();
    this.closeModal();
  },
  reset(){
    !!this.refs.modalContent && this.refs.modalContent.reset();
  },
  closeModal(){
    this.setState({ visible: false });
  },
  getInputValueOnSubmit(){
    var value = "";
    !!this.refs.modalContent && this.refs.modalContent.state.selectedItems.map(function(o, i){
      if(!!value){
        value += ","
      }
      value += o.label;
    });
    this.setState({inputValue: value});
  },
  // onFocus(e){
  //   e.target.blur();
  // },
  render(){
    let props = this.props;
    let inpProps = {
      className: "hhrms-source",
      onClick: this.onClick,
      value: this.state.inputValue,
      // onFocus: this.onFocus,
      readOnly: true
    }
    let ModalOpt = {
        title: this.props.title,
        visible:this.state.visible,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        loading: this.state.loading,
        isFullModel: this.state.isFullModel,
        width: this.props.width || "800px"
    }
    let ModalContentOpt = {
      onItemCheck: this.props.onItemCheck ,
      // onModalSubmit: this.props.onModalSubmit ,
      options: this.props.options ,
      contentHeight: this.props.contentHeight || "430px",
      option: this.props.option ,
      detaultSelectedItems: this.state.detaultSelectedItems,
      // disabledItems: this.props.disabledItems || []
    }
    return (
      <div style={this.props.style}>
        <Input {...inpProps}/>
        <Modal ref="modal" {...ModalOpt}>
          <ModalContent ref="modalContent" {...ModalContentOpt} />
        </Modal>
      </div>
    )
  }
});

module.exports = RModalSelect;
