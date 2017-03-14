import React from 'react';
import _ from 'lodash';
import { Checkbox } from 'antd';

const ModalList = React.createClass({
  getInitialState(){
    return {

    }
  },
  getTbody(list){
    var _this = this;
    let dom = list.map(function(o, i, objs){
      let label = null;
      if(!!o.hasChildNode){
        label = <a onClick={function(){_this.onLabelClick(o)}} href="#" className="nameSpan">{o.label}</a>;
      }else {
        label = <span className="nameSpan">{o.label}</span>;
      }
      return (
        <tr key={o.id}>
          <td className="item-type">{o.type}</td>
          <td className="item-name">
            <span>
              <span className="inputSpan ant-checkbox">
                <Checkbox onChange={function(e){ _this.props.onCheckChange(o, e.target.checked)}} />
              </span>
              {label}
            </span>
          </td>
          <td className="item-path">{o.path}</td>
        </tr>
        )
    });
    return dom;
  },
  onLabelClick(item){
    this.props.onLabelClick(item);
  },
  render(){
    let tbody = this.getTbody(this.props.showList);
    return (
      <div className="list">
        <div className="listTitle">
          <div className="titleItem">类别</div>
          <div className="titleItem">名称</div>
          <div className="titleItem">路径</div>
        </div>
        <div className="listContent">
          <table>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});

module.exports = ModalList;
