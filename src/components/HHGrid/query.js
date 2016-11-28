import React from 'react';

const Query = React.createClass({
 getInitialState(){
   return { };
 },
 render() {
   return (
      <div className="grid-query">
        <span className="grid-query-inp-wraper">
          <input type="text" placeholder="请输入关键字" className="grid-query-inp" />
          <span className="grid-query-clear"></span>
        </span>
      </div>
    )
  }
});
module.exports = Query;
