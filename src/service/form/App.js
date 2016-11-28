import React from 'react';
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from './actions'
// import Form from './Form'
import Form from 'svc2Src/components/HHForm/Form';


const mapStateToProps = (state, ownProps) => {
  return {
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
  }
  render() {
    return (
        <div>
          <Form/>
        </div>
    );
  }
})
