import React from 'react';
import { createStore } from 'redux';
import $ from "jquery";

import Container from './Container';
import NavContainer from './NavContainer';

require('../../../index.css');
import injectTapEventPlugin from 'react-tap-event-plugin';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import getMasterCarrier from 'svc2Src/util/js/MasterCarrier';
import getCarrier from 'svc2Src/util/js/Carrier';
let carrier;

injectTapEventPlugin();

let masterCarrier = getMasterCarrier(Actions,['message','portal','notification']);

const mapStateToProps = (state, ownProps) => {
  return {
    isPack: state.isPack
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
       actions : bindActionCreators(Actions,dispatch)
   }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(class App extends React.Component {
  constructor (props) {
    super(props);
    this.props.actions.getMenu();
    carrier = getCarrier(this.props.actions,['message','notification']);
  }
  render() {
    return (
        <div className="bodyDiv">
          <div className="navDiv" style={{ width:(this.props.isPack?70:240)}}>
            <NavContainer />
          </div>
          <div className="cotainerDiv" style={{ marginLeft:(this.props.isPack?70:240)}}>
            <Container />
          </div>
        </div>
    );
  }
  componentDidMount(){
    debugger
  }
})
