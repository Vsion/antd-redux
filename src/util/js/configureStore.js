import { createStore, compose ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _DevTools from './DevTools';

// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
  _DevTools.instrument()
);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const configureStore = function(reducer) {

  let store;
  if (__DEBUG__) {
    // store = applyMiddleware(thunk)(createStore(reducer,enhancer));
    store = createStoreWithMiddleware(reducer,enhancer)
  }else {
    store = createStoreWithMiddleware(reducer);
  }
  return store;
}

export {
  configureStore,
  _DevTools as DevTools
}
