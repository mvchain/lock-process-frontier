import { login, registered, forget, getVali, changePwd, changePhone } from '@/api/login'

const user = {
  state: {
    token: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 登录
    Login({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          commit('SET_TOKEN', res.message)
          resolve(res.message)
        }).catch(error => {
          reject(error)
        })
      })
    },
    setRegistered({ commit }, payload) {
      return new Promise((resolve, reject) => {
        registered(payload).then((res) => {
          if (res.status === 200) {
            resolve()
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    setForgetPwd({ commit }, payload) {
      return new Promise((resolve, reject) => {
        forget(payload).then((res) => {
          if (res.status === 200) {
            resolve()
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getVali({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getVali(payload).then((res) => {
          if (res.status === 200) {
            resolve()
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    changePwd({ commit }, payload) {
      return new Promise((resolve, reject) => {
        changePwd(payload).then((res) => {
          if (res.status === 200) {
            resolve()
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    changePhone({ commit }, payload) {
      return new Promise((resolve, reject) => {
        changePhone(payload).then((res) => {
          if (res.status === 200) {
            resolve()
          } else {
            reject(res.message)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default user
