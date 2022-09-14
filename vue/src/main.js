import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css
import './assets/css/common.css'
import '@/assets/css/iconfont.css'
// 淘宝无线适配文件
import './assets/js/flexible.js'

// ly-tab插件
import LyTab from 'ly-tab'

// Mint-ui
// import { MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Lazyload, Checkbox, Stepper, AddressEdit, RadioGroup, Radio, Icon } from 'vant'
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.use(Stepper)
Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
Vue.use(LyTab)
Vue.use(Lazyload)
Vue.use(AddressEdit)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Icon)
// Vue.use(MessageBox)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
