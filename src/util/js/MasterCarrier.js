import _ from 'lodash';

const MasterCarrier = class {
  constructor (action,tags) {
    window.MasterCarrier = this;
    this.action = action;
    this.tags = tags;
    this.CarrierMap = {};
  }

  register (carrier){
    this.CarrierMap[carrier.id] = carrier;
  }

  dispatch (evt){
    _.forEach(this.CarrierMap,function (c,id) {
      c.receive(evt)
    })
  }

  receive (evt){
    this.dispatch(evt);
  }

  callback(evt,id){
    console.log(id+"miss evt!");
  }
}

export default (...args) => {
  return window.MasterCarrier || new MasterCarrier(...args)
}
