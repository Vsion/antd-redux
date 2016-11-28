export default (state = {
  text:"111",
}, action) => {
  switch (action.type) {
    case 'TEST_CARRIER':
      return Object.assign({} ,state,
          { text : action.state }
        );
    default:
      return state;
  }
};
