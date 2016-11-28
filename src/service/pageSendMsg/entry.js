import common from 'svc2Src/util/js/common'
import {render} from 'react-dom';
import React from 'react';
// import Drill from '../index/drill';
import reducer from './reducers';
import App from './App';
import { Provider } from 'react-redux';
import {configureStore,DevTools} from 'svc2Src/util/js/configureStore'


let store = configureStore(reducer);

render(
    <Provider store={store}>
      <App />
    </Provider>
      ,
  document.getElementById('app')
);

// import common from 'svc2Src/util/js/common'
// import React from 'react';
// import {render} from 'react-dom';
//
// render(
//   <div>
//     这是一个title 为 Tab2 的h5 页面
//   </div>,
//   document.getElementById('app')
// );
