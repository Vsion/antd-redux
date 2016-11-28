export const testGetCarrierFn = (state) => {
  return {
    type: 'TEST_CARRIER',
    state
  }
}

let sleep = (time)=>{
  return new Promise(function(resolve) {
    setTimeout(function() {
        resolve();
    }, time);
  });
}

export let asyncFn = (msg,msg1) => {
  console.log(msg);
  return async (dispatch) => {
    await sleep(2000);
    console.log(msg1);
  };
}
