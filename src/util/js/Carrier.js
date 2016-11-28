import _ from 'lodash';

const Carrier = class {
  constructor (action,tags) {
    window.Carrier = this;
    this.action = action;
    this.MasterCarrier = window.top.MasterCarrier;
    this.id = new Date().getTime();
    this.tags = tags || [];
    this.MasterCarrier.register(this);
  }

  dispatch (evt){
    this.MasterCarrier.receive(evt)
  }

  receive (evt){
    let fnName = evt.fnName;
    let params = evt.params;
    let tag = evt.tag;
    if(_.includes(this.tags,tag)){
      !!this.action[fnName] ? this.action[fnName](params) : this.MasterCarrier.callback(evt,this.id);
    }
  }
}

export default (...args) => {
  return window.Carrier || new Carrier(...args)
}
