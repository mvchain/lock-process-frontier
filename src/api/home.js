import request from '@/utils/request'

export function moneyList() {
  return request({
    url: '/console/transaction/balance',
    method: 'get'
  })
}
export function address() {
  return request({
    url: '/user/address',
    method: 'post'
  })
}
export function record(data) {
  return request({
    url: '/console/transaction/list' + data,
    method: 'get'
  })
}
export function withdrawRule() {
  return request({
    url: '/console/config/all',
    method: 'get'
  })
}
export function withdrawHandler(data) {
  return request({
    url: '/console/transaction/withdraw',
    method: 'post',
    data
  })
}
export function lockPosition(data) {
  return request({
    url: '/console/transaction/deposite',
    method: 'post',
    data
  })
}
export function lockRecord(data) {
  return request({
    url: '/console/transaction/deposite',
    method: 'post',
    data
  })
}
