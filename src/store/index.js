import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import money from './modules/money'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    money
  },
  getters
})

export default store
