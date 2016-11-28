export default (state = {
  visible: false
}, action) => {
  switch (action.type) {
    case 'TEST_CARRIER':
      return Object.assign({} ,state,
          { text : action.state }
        );
    case 'TOGGLE_MODAL':
      return Object.assign({} ,state,
          { visible : action.state }
        );
    default:
      return state;
  }
};
