import React from 'react';
import {render} from 'react-dom';
import App from './App';
//import App2 from 'svc2Src/service/tab2/App';
import common from 'svc2Src/util/js/common';
import { Provider } from 'react-redux';
import reducer from './reducers';
// import DevTools from 'svc2Src/util/js/DevTools'
import {configureStore,DevTools} from 'svc2Src/util/js/configureStore'


//通过默认配置来建立store，包括devtools和thunk中间件
let store = configureStore(reducer);

render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>
  ,
  document.getElementById('app')
);
