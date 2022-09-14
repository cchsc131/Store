// eslint-disable-next-line no-unused-vars
const User = {
  queryUserTel(option) {
    return 'select * from user where tel =' + option.userTel + ' '
  },
  queryUserPwd(option) {
    return 'select * from user where (tel =' + option.userTel + ') and pwd = ' + option.userPwd + ' '
  },
  // 新增用户
  inserData(option) {
    const userTel = option.userTel
    const userPwd = option.userPwd || '123456'
    // 引入token包
    const jwt=require('jsonwebtoken')
    // 用户信息
    const payload={tel:userTel}
    const secret='hanshao'
    // 生成token
    const token=jwt.sign(payload,secret)
    return 'insert into user (tel,pwd,imgUrl,nickName,token) values ("' + userTel + '","' + userPwd + '","/images/tx2.jpg","' + userTel + '","'+token+'")'
  }
}
exports = module.exports = User
