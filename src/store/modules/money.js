import { moneyList, address, record, withdrawRule, withdrawHandler, lockPosition, lockRecord, clearMoney } from '@/api/home'

const money = {
  state: {
    moneyList: [],
    recordList: {},
    withdrawData: [],
    lockRecordList: {}
  },

  mutations: {
    SET_MONEY_LIST: (state, moneyList) => {
      state.moneyList = moneyList
    },
    SET_RECORD_LIST: (state, recordList) => {
      state.recordList = recordList
    },
    SET_WITHDRAW_DATA: (state, withdrawData) => {
      state.withdrawData = withdrawData
    },
    SET_LOCK_RECORD: (state, lockRecordList) => {
      state.lockRecordList = lockRecordList
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
    },
    getAddress({ commit, state }) {
      return new Promise((resolve, reject) => {
        address().then(res => {
          if (res.status === 200) {
            resolve(res.message)
          } else {
            reject(res.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRecord({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        record(payload).then(res => {
          if (res.status === 200) {
            commit('SET_RECORD_LIST', res.data)
            resolve()
          } else {
            reject(res.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getWithdrawRule({ commit, state }) {
      return new Promise((resolve, reject) => {
        withdrawRule().then(res => {
          commit('SET_WITHDRAW_DATA', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getWithdrawHandler({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        withdrawHandler(payload).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getLockPosition({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        lockPosition(payload).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getLockRecord({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        lockRecord(payload).then(res => {
          commit('SET_LOCK_RECORD', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getClearMoney({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        clearMoney(payload).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default money
