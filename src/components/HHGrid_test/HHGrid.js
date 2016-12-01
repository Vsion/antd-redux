import React from 'react';
require('./HHGrid.scss');
import Title from './title';
import Query from './query';
import Body from './body';

const HHGrid = React.createClass({
   getInitialState(){
     return { };
   },
   render() {
     return (
       <div className="grid-list">
          <Title title="这是一个标题" />
          <Query />
          <Body />
       </div>
     );
   },
 });

module.exports = HHGrid;
