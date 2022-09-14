"use strict";

// eslint-disable-next-line no-unused-vars
var User = {
  queryUserTel: function queryUserTel(option) {
    return 'select * from user where tel =' + option.userTel + ' ';
  },
  queryUserPwd: function queryUserPwd(option) {
    return 'select * from user where (tel =' + option.userTel + ') and pwd = ' + option.userPwd + ' ';
  },
  // 新增用户
  inserData: function inserData(option) {
    var userTel = option.userTel;
    var userPwd = option.userPwd || '123456'; // 引入token包

    var jwt = require('jsonwebtoken'); // 用户信息


    var payload = {
      tel: userTel
    };
    var secret = 'hanshao'; // 生成token

    var token = jwt.sign(payload, secret);
    return 'insert into user (tel,pwd,imgUrl,nickName,token) values ("' + userTel + '","' + userPwd + '","/images/tx2.jpg","' + userTel + '","' + token + '")';
  }
};
exports = module.exports = User;