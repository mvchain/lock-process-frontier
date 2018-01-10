import request from '@/utils/request'

export function moneyList(params) {
  return request({
    url: '/console/transaction/balance',
    method: 'get',
    params
  })
}
