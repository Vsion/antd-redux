import React from 'react';

const Title = React.createClass({
 getInitialState(){
   return { };
 },
 render() {
   return (
     <div className="grid-title">
       <div className="grid-title-content">
         <div id="gridTitle">{this.props.title}</div>
       </div>
     </div>
   )
  }
});
module.exports = Title;
