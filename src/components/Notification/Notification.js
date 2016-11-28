import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { Message, Button, notification } from 'antd';
//四种type success error warning info
const openNotificationWithIcon = (type, description, message) =>{
  notification[type]({
    message: message || type,
    description: description,
  })
};
//message标题 description描述 func点击确定的回调函数
const openNotification = (message, description, func) =>{
  const key = `open${Date.now()}`;
  const btnClick = function () {
    notification.close(key);
    if(!!func){
      func();
    }
  };
  const close = function () {
    console.log('通知面板:点击了确认');
  };
  const btn = (
    <Button type="primary" size="small" onClick={btnClick}>
      Confirm
    </Button>
  );
  notification.open({
    message: message,
    description: description,
    btn,
    key,
    onClose: close,
    duration: 0,
  });
};

export {
  openNotificationWithIcon,
  openNotification
}
