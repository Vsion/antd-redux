import React from 'react';
import GridFixed from './GridFixed';
import GridData from './GridData';

const Body = React.createClass({
 getInitialState(){
   return { };
 },
 render() {
   return (
     <div className="grid-body">
       <GridFixed />
       <GridData />
     </div>
   )
  }
});
module.exports = Body;
