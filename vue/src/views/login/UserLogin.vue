<template>
  <div class='login container'>
    <Header></Header>
    <section>
      <div class='login-tel'>
        <input type="text" v-model='userTel' placeholder="请输入手机号" pattern="[0-9]*">
      </div>
      <div class='login-tel'>
        <input type="text" v-model='userPwd' placeholder="请输入密码">
      </div>
      <div class='login-btn' @click='login'>登 录</div>
      <div class='tab'>
        <span @click='goLogin'>验证码登录</span>
        <span>找回密码</span>
        <span @click='goRegister'>快速注册</span>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from './Header'
import http from '@/common/api/request.js'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      userTel: '',
      userPwd: '',
      // 验证规则
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字'
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且是6到12位数字'
        }
      }
    }
  },
  components: {
    Tabbar,
    Header
  },
  methods: {
    ...mapMutations(['userLogin']),
    login() {
      // 前端验证
      // eslint-disable-next-line no-useless-return
      if (!this.validate('userTel')) return
      // eslint-disable-next-line no-useless-return
      if (!this.validate('userPwd')) return

      // 后端验证
      http.$axios({
        url: '/api/login',
        method: 'POST',
        data: {
          userTel: this.userTel,
          userPwd: this.userPwd
        }
      }).then(res => {
        Toast(res.msg)
        // 登录失败
        if (!res.success) return
        // 登录成功
        // console.log(res.data)
        this.userLogin(res.data)
        this.$router.push('/my')
      })
    },
    goLogin() {
      this.$router.push('/login')
    },
    goRegister() {
      this.$router.push('/register')
    },
    // 验证信息提示
    validate(key) {
      // eslint-disable-next-line no-unused-vars
      let bool = true
      // eslint-disable-next-line no-empty
      if (!this.rules[key].rule.test(this[key])) {
        // eslint-disable-next-line no-unused-vars
        // 提示信息
        Toast(this.rules[key].msg)
        bool = false
        return false
        // console.log(bool)
      }
      return bool
    }
  }
}
</script>

<style scoped lang='scss'>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.32rem;
  background-color: #f5f5f5;
  div {
    margin: 0.266666rem 0;
    width: 8.933333rem;
    height: 1.173333rem;
  }
  input {
    box-sizing: border-box;
    padding: 0 0.266666rem;
    line-height: 1.173333rem;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .login-tel {
    margin-top: 0.8rem;
    input {
      width: 8.933333rem;
    }
  }
  .login-code {
    display: flex;
    input {
      flex: 1;
    }
    button {
      padding: 0 0.533333rem;
      line-height: 1.173333rem;
      color: #fff;
      background-color: cadetblue;
      border: 0;
      border-radius: 6px;
    }
  }
  .login-btn {
    line-height: .9rem;
    color: #fff;
    font-size: 0.48rem;
    text-align: center;
    background-color: cadetblue;
    border-radius: 6px;
  }
  .tab {
    display: flex;
    justify-content: space-between;
    font-size: 0.373333rem;
  }
}
</style>
