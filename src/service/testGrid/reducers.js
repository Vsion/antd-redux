export default (state = {
  tableData:[]
}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return Object.assign({} ,state, action.state);
    default:
      return state;
  }
};
