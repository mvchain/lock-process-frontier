import { moneyList } from '@/api/home'

const money = {
  state: {
    moneyList: []
  },

  mutations: {
    SET_MONEY_LIST: (state, moneyList) => {
      state.moneyList = moneyList
    }
  },

  actions: {
    getMoneyList({ commit, state }) {
      return new Promise((resolve, reject) => {
        moneyList().then(res => {
          if (res.status === 200) {
            commit('SET_MONEY_LIST', res.data)
            resolve()
          } else {
            reject(res.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default money
