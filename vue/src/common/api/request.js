/* eslint-disable curly */
import { Indicator } from 'mint-ui'
import axios from 'axios'
import store from '@/store'
import router from '@/router/index.js'
export default {

  common: {
    method: 'GET',
    data: {},
    params: {},
    headers: {}
  },
  async $axios(options = {}) {
    options.method = options.method || this.common.method
    options.data = options.data || this.common.data
    options.params = options.params || this.common.params
    options.headers = options.headers || this.common.headers
    // 请求前==》显示加载中...
    Indicator.open('加载中...')

    // 是否是登录状态
    if (options.headers.token) {
      options.headers.token = store.state.user.token
      console.log(store.state.user.token)
      if (!options.headers.token) {
        router.push('/login')
      }
    }

    const v = await axios(options)
    const data = v.data.data
    // eslint-disable-next-line promise/param-names
    return await new Promise((res, rej) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!v)
        // eslint-disable-next-line prefer-promise-reject-errors
        return rej()
      // 结束===》关闭加载中
      setTimeout(() => {
        Indicator.close()
      }, 300)
      res(data)
    })
  }

}
