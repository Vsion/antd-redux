export const testGetCarrierFn = (state) => {
  return {
    type: 'TEST_CARRIER',
    state
  }
}
export const getData = (state) => {
    return async (dispatch) => {
      let msg = await fetch('data/tableData',{
        method: 'POST',
        header: {'content-type':'application/json; charset=utf-8'}
      }).then((res)=>res.json());
      var state = { tableData: msg.results };
      dispatch({
        type: 'GET_DATA',
        state
      })
    };
  }
