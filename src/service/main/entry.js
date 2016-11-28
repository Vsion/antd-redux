import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import '../../util/css/main.scss';

render(
  <div id="desktopImg">
    <img id="desktopImg" src={require("svc2Src/util/img/desktop.png")} />
  </div>,
  document.getElementById('app')
);
