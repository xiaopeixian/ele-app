import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// types
const types = {
  SET_LOCATION:"SET_LOCATION",
  SET_ADDRESS:"SET_ADDRESS"
}

// state
const state = {
  location:{},
  address:""
}

// getters
const getters = {
  location: state => state.location,
  address: state => state.address
}

// mutation 都是同步事务
// 只有mutation 才能改变state.
const mutations = {
  [types.SET_LOCATION](state,location) {
    if (location) {
      state.location = location
    } else {
      state.location = null
    }
  },
  [types.SET_ADDRESS](state,address) {
    if (address) {
      state.address = address
    } else {
      state.address = "";
    }
  },
}

// actions
// 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作。
// commit 同步 dispatch 异步（向后台发送请求获取数据）
const actions = {
  setLocation:({commit},location)=>{
    commit(types.SET_LOCATION,location)
  },
  setAddress:({commit},address)=>{
    commit(types.SET_ADDRESS,address)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
