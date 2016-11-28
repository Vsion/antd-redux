import React from 'react';
import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

const HHConfirm = function(res) {
  return new Promise(function (resolve, reject) {
    confirm({
         title: res.title,
         content: res.content,
         okText: res.okText || 'OK',
         cancelText: res.cancelText || 'Cancel',
         onOk () {
           resolve();
         },
         onCancel () {
           reject();
         },
       });
	}).then(()=> true,()=> false)
}
module.exports = HHConfirm;
