import React from 'react';
import { Input ,Checkbox} from 'antd';
import "./index.scss";
import Modal from '../HHModal/Modal';
import ModalContent from './ModalContent';

const RModalSelect = React.createClass({
  getInitialState(){
    return {
      visible: true,
      loading: false,
      isFullModel: false
     };
  },
  componentDidUpdate(props) {

  },
  componentDidMount() {

  },
  onSubmit(){

  },
  onCancel(){

  },
  componentWillUnmount() {

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
    console.log("click");
  },
  handleOk(){
    this.closeModal();
  },
  handleCancel(){
    this.closeModal();
  },
  closeModal(){
    this.setState({ visible: false });
  },
  render(){
    let props = this.props;
    let inpProps = {
      className: "hhrms-source",
      onClick: this.onClick
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
    return (
      <div style={this.props.style}>
        <Input {...inpProps}/>
        <Modal {...ModalOpt}>
          <ModalContent options={this.props.options} contentHeight={this.props.contentHeight || "430px"} option={this.props.option} />
        </Modal>
      </div>
    )
  }
});

module.exports = RModalSelect;
