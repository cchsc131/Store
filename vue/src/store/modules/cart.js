import { CART_LIST, CHECK_ALL, CHECK_ITEM, UN_CHECK_ALL } from './mutations-types.js'
import { Toast, Dialog } from 'vant'
import http from '@/common/api/request.js'

export default {
  state: {
    list: [],
    selectList: []
  },
  getters: {
    checkedAll(state) {
      // eslint-disable-next-line eqeqeq
      return state.list.length == state.selectList.length
    },
    total(state) {
      // eslint-disable-next-line prefer-const
      const total = {
        num: 0,
        price: 0
      }
      state.list.forEach(v => {
        // console.log(v)
        if (v.checked) {
          total.num += parseInt(v.goods_num)
          total.price += v.goods_num * v.goods_price
        }
      })
      return total
    }
  },
  mutations: {
    [CART_LIST](state, cartArr) {
      state.list = cartArr

      state.selectList = state.list.map(v => {
        return v.id
      })
    },
    // 全选
    [CHECK_ALL](state) {
      state.selectList = state.list.map(v => {
        v.checked = true
        return v.id
      })
    },
    // 全不选
    [UN_CHECK_ALL](state) {
      state.list.forEach(v => {
        v.checked = false
        // return v.id
      })
      state.selectList = []
    },
    [CHECK_ITEM](state, index) {
      const id = state.list[index].id
      // console.log(id)
      // eslint-disable-next-line no-unused-vars
      const i = state.selectList.indexOf(id)
      // 如果有i就大于大于0
      if (i > -1) {
        return state.selectList.splice(i, 1)
      }
      // 如果现在被选中
      state.selectList.push(id)
      console.log(state.list)
    },
    // 删除购物车页面的商品
    delGoods(state) {
      // eslint-disable-next-line array-callback-return
      state.list = state.list.filter(v => {
        // eslint-disable-next-line eqeqeq
        return state.selectList.indexOf(v.id) == -1
      })
    }
  },
  actions: {
    checkedAllFn({ commit, getters }) {
      getters.checkedAll ? commit('unCheckAll') : commit('checkAll')
    },
    deleteFn({ commit, state }, id) {
      // eslint-disable-next-line eqeqeq
      if (state.selectList.length == 0) {
        Toast('请选择需要删除的商品')
      }
      // console.log(typeof id)
      // eslint-disable-next-line no-unused-vars
      let arrCartId = []
      Dialog.confirm({
        message: '确认删除？'
      }).then(() => {
        // 删除单个
        if (typeof id === 'number') {
          arrCartId = [id]
          console.log(id)
          const index = state.list.findIndex(v => {
            // eslint-disable-next-line eqeqeq
            return v.id == id
          })
          state.list.splice(index, 1)
        } else {
          // 全选删除多个
          arrCartId = state.selectList
          commit('delGoods')
          // q全不选
          // commit('unCheckAll')
        }
        // state.list.splice(id, 1)

        http.$axios({
          url: '/api/deleteCart',
          method: 'post',
          data: {
            arrId: arrCartId
          }
        }).then(res => {
          // state.list.splice(id, 1)
          console.log(res)
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
