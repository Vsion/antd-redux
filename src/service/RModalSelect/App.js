import React from 'react';
import {Button, Icon, Input } from 'antd';

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
  }
  onClick (){

  }
  render() {
    return (
        <div className="bodyDiv" style={{padding: "30px"}}>
          <RModalSelect style={{width: "300px"}} />
          <Button onClick={this.onClick}><Icon type="search" />点击</Button>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App);
