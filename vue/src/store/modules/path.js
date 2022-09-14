import { INIT_PATH } from './mutations-types.js'

export default {
  state: {
    list: []
  },
  getters: {
    defaultPath(state) {
      return state.list.filter(v => {
        // eslint-disable-next-line eqeqeq, space-infix-ops
        return v.isDefault==1
      })
    }
  },
  mutations: {
    [INIT_PATH](state, arrPath) {
      state.list = arrPath
    }
  }
}
