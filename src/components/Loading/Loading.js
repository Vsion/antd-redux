import React from 'react';
import { Spin } from 'antd';

let inst;//组件实例,用于listener函数调用组件状态

const Loading = React.createClass({
  getInitialState(){
    inst = this;
    return {loading: false};
  },
  render(){
    return (
      <Spin spinning={this.state.loading}>
        {this.props.children}
      </Spin>
      )
    }
  })

const listener = (aynscFn,...args) =>{
  inst.setState({loading:true})
  return aynscFn(...args).then(()=>{inst.setState({loading:false})});
}
export {
  Loading,
  listener
}
