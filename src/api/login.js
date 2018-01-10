import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function registered(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
export function forget(data) {
  return request({
    url: '/user/forget',
    method: 'post',
    data
  })
}
export function getVali(data) {
  return request({
    url: '/message/sms/code',
    method: 'post',
    data
  })
}
export function changePwd(data) {
  return request({
    url: '/user/pwd',
    method: 'post',
    data
  })
}
export function changePhone(data) {
  return request({
    url: '/user/cellPhone',
    method: 'post',
    data
  })
}
