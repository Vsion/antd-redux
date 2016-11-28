import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import { message, Button, notification } from 'antd';
//message 配置参数
message.config({
  top: 10,
  duration: 2,
});

const successMessage = function () {
  message.success('全局提醒: success');
};

const errorMessage = function () {
  message.error('全局提醒: error');
};

const warningMessage = function () {
  message.warning('全局提醒: warning');
};

const loadingMessage = () => {
  message.loading('loading..');
};

const infoMessage = function (msg) {
  message.info(msg);
};

const close = function () {
  console.log('通知面板:点击了确认');
};

export {
  successMessage,
  errorMessage,
  warningMessage,
  loadingMessage,
  infoMessage
}
