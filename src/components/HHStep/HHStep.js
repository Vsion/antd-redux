import React from 'react';
import { Steps, Icon } from 'antd';
const Step = Steps.Step;

const HHStep = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     const stepItems = this.props.stepItems.map(function(o,i,objs){
         return (
           <Step status={o.status} title={o.title} icon={o.icon} key={o.status} />
         )
       })
     return (
       <Steps current={this.props.current} status={this.props.status}>
          {stepItems}
       </Steps>
     );
   },
 });

module.exports = HHStep;
