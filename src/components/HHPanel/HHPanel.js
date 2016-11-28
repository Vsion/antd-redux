import React from 'react';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const HHPanel = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     let PanelList = this.props.PanelList.map(function(o,i,obj){
       return (
         <Panel header={o.header} key={o.key}>
           {o.children}
         </Panel>
       )
     });
     return (
       <Collapse style={this.props.style} defaultActiveKey={this.props.defaultActiveKey} onChange={this.props.onChange}>
         {PanelList}
       </Collapse>
     );
   },
 });

module.exports = HHPanel;
