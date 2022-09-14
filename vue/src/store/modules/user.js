import {
  USER_LOGIN,
  INIT_USER,
  LOGIN_OUT
} from './mutations-types.js'
import { MessageBox } from 'mint-ui'

export default {
  state: {
    // list: 123,
    // 登录状态
    loginStatus: false,
    // token
    token: null,
    // 用户信息
    userInfo: {

    }
  },
  getters: {},
  mutations: {
    // 设置

    // user传过来的用户信息
    [USER_LOGIN](state, user) {
      // console.log(state, user)
      state.loginStatus = true
      // token
      state.token = user.token
      // 用户信息
      state.userInfo = user
      // 持久化存储----本地
      localStorage.setItem('teaUserInfo', JSON.stringify(user))
    },
    // 读取
    [INIT_USER](state) {
      const userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
      if (userInfo) {
        state.loginStatus = true
        // token
        state.token = userInfo.token
        // 用户信息
        state.userInfo = userInfo
      }
    },
    // 退出
    [LOGIN_OUT](state) {
      MessageBox({
        title: '提示',
        message: '确定退出登录?',
        showCancelButton: true
      }).then(res => {
        if (res === 'confirm') {
          state.loginStatus = false
          // token
          state.token = null
          // 用户信息
          state.userInfo = {}
          localStorage.removeItem('teaUserInfo')
        }
      })
    }
  },
  actions: {}
}
