import React from 'react';
import { Input ,Checkbox} from 'antd';
import "./index.scss";

export default class RModalSelect extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      isReset: props.isReset,
    }
  }
  componentDidUpdate(props) {

  }
  componentDidMount() {

  }
  onSubmit(){

  }
  onCancel(){

  }
  componentWillUnmount() {

  }
  onChange(value){

  }
  onClick(){

  }
  render(){
    let props = this.props;
    let inpProps = {
      className: "hhrms-source",
      
    }
    return (
      <div style={this.props.style}>
        <Input {...inpProps}/>
      </div>
    )
  }
}
