import React from 'react';

require('svc2Src/util/css/common.scss');

import { connect } from 'react-redux'
import { bindActionCreators ,createStore} from 'redux'
import * as Actions from './actions'
import RModalSelect from 'svc2Src/components/HHRModalSelect/index';

let carrier;

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.text
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      options: {
        list: [
          {id: "a0", type: "level0", label: "A0", pid: ""},
          {id: "a1", type: "level1", label: "A1", pid: "a0"},
          {id: "a2", type: "level0", label: "A2", pid: ""},
          {id: "a3", type: "level2", label: "A3", pid: "a1"},
          {id: "a4", type: "level3", label: "A4", pid: "a3"},
        ],
        type: ["level0", "level1", "level2", "level3"],
        defaultValue: {level0: "a0", "level2": "a3"},
        disabledItems: ["level0_a2"]
      }//data: [{"id":"a0","name":"AA","label":"视频"}]
    }
  }
  onClick (){

  }
  onItemCheck(o, isChecked, selectedItems, allItems){
    var resArr = [];
    if(isChecked){
      resArr.push(o);
    }
    var disabledItems = ["level0_a2"];
    debugger
    return {
      selectedItems: resArr,
      disabledItems: disabledItems
    };
  }
  onModalSubmit(selectedItems, allItems){
    return selectedItems;
  }
  render() {
    return (
        <div className="bodyDiv" style={{padding: "30px"}}>
          <RModalSelect ref="rms" onModalSubmit={this.onModalSubmit} onItemCheck={this.onItemCheck} options={this.state.options} style={{width: "300px"}} />
        </div>
    );
  }
  componentDidMount() {
    debugger
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App);
