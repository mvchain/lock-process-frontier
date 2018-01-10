export function getToken() {
  return window.sessionStorage.getItem('mvcUser')
}

export function setToken(token) {
  return window.sessionStorage.setItem('mvcUser', token)
}

export function removeToken() {
  return window.sessionStorage.clear()
}
