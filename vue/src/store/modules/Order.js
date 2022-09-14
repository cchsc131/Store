import { INIT_ORDER } from './mutations-types.js'

export default {
  state: {
    list: [],
    order_id: localStorage.getItem('tea_orderId') || ''
  },
  // getters: {
  //   defaultPath(state) {
  //     return state.list.filter(v => {
  //       // eslint-disable-next-line eqeqeq, space-infix-ops
  //       return v.isDefault==1
  //     })
  //   }
  // },
  mutations: {
    [INIT_ORDER](state, orderId) {
      state.list = orderId
      // 存储
      state.order_id = orderId[0].order_id
      console.log(orderId[0].order_id)
      localStorage.setItem('tea_orderId', orderId[0].order_id)
    }
  }
}
