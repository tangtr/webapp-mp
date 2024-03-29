'use strict';

var env = require('./config.js'); //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;

var base64 = require('./base64.js'); //Base64,hmac,sha1,crypto相关算法
require('./hmac.js');
require('./sha1.js');
var Crypto = require('./crypto.js');

/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
var uploadFile = function uploadFile(filePath, dir, successc, failc) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false
    });
    return;
  }

  console.log('上传图片.....');
  //图片名字 可以自行定义，     这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  var aliyunFileKey = dir;
  var aliyunServerURL = env.uploadImageUrl; //OSS地址，需要https
  var accessid = env.OSSAccessKeyId;
  var policyBase64 = getPolicyBase64();
  var signature = getSignature(policyBase64); //获取签名

  console.log('aliyunFileKey', aliyunFileKey);
  console.log('policyBase64', policyBase64);
  console.log('accessid', accessid);
  console.log('dir', dir);
  console.log('env', env);

  wx.uploadFile({
    url: aliyunServerURL, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    name: 'file', //必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200'
    },
    success: function success(res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)));
        return;
      }
      successc(aliyunFileKey);
    },
    fail: function fail(err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    }
  });
};

var getPolicyBase64 = function getPolicyBase64() {
  var date = new Date();
  date.setHours(date.getHours() + env.timeout);
  var srcT = date.toISOString();
  var policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [["content-length-range", 0, 5242880] // 设置上传文件的大小限制,5mb
    ]
  };

  var policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
};

var getSignature = function getSignature(policyBase64) {
  var accesskey = env.AccessKeySecret;

  var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  var signature = Crypto.util.bytesToBase64(bytes);

  return signature;
};

module.exports = uploadFile;