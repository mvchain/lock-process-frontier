const getters = {
  token: state => state.user.token,
  moneyList: state => state.money.moneyList,
  recordList: state => state.money.recordList,
  withdrawData: state => state.money.withdrawData,
  lockRecordList: state => state.money.lockRecordList,
}
export default getters
