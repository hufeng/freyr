var {AlertIOS} = require('react-native');
var assgin = require('object-assign');
var msg = require('./msg');


/**
 * 封装公共的fetch服务
 */
module.exports = (url, req) => {
  var request = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.token
    }
  };

  var merge = assgin({}, request, req);

  if (__DEV__) {
    console.log(url, merge);
  }

  return new Promise((resolve, reject) => {
    fetch(url, merge)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          return {
            results: []
          };
        }
      })
      .then((res) => {
        if (res.detail) {
          //token失效
          msg.emit('tokenInvalid');
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        AlertIOS.alert('矮油，您的网络不给力:(');
        reject(err);
      })
      .done();
  });
};
