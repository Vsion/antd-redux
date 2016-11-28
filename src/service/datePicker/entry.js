import {render} from 'react-dom';
import React from 'react';
import App from './App';
import reducer from './reducers';

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
