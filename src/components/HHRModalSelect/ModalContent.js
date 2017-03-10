import React from 'react';
import {Button, Icon, Input } from 'antd';

const ModalContent = React.createClass({
  getInitialState(){
    return {

     };
  },
  onKeyUp(e){
    let value = e.target.value;
    console.log(value);
  },
  render(){
    var btnType = {
      type: "primary",
    }
    return (
        <div className="rModalSelect" ref="dom" style={{width: "100%", height: this.props.contentHeight}}>
          <div className="top">
            <Input onChange={this.onKeyUp} />
            <Button>清除已选结果</Button>
          </div>
          <div className="panel">
            <Button {...btnType}>test</Button>
          </div>
            {this.props.children}
        </div>
    )
  },
  componentDidMount(props) {
    this.setTextAlign();
  },
  setTextAlign(){
    let footer = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-footer");
    let close = this.refs.dom.parentElement.parentElement.querySelector(".ant-modal-close");
    footer.style.textAlign="center";
    close.style.top="8px";
    close.style.right="8px";
  }
})

module.exports = ModalContent;
