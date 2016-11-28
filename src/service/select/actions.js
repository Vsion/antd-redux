export const testGetCarrierFn = (state) => {
  return {
    type: 'TEST_CARRIER',
    state
  }
}
export const getData = (func,c) => {
    return async (dispatch) => {
      let msg = await fetch('data/tableData',{
        method: 'POST',
        header: {'content-type':'application/json; charset=utf-8'}
      }).then((res)=>res.json());
      var state = { tableData: msg.results };
      //func(c);
      dispatch({
        type: 'GET_DATA',
        state
      })
    };
  }
