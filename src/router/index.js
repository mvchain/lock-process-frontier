import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/myMoney/moneyIndex',
    children: [{
      path: '/myMoney',
      name: 'myMoney',
      redirect: '/myMoney/moneyIndex',
      component: _import('myMoney/index'),
      meta: { title: '我的资金' },
      children: [
        {
          path: '/myMoney/moneyIndex',
          name: 'moneyIndex',
          component: _import('myMoney/moneyIndex/index'),
          meta: { title: '资金列表' }
        },
        {
          path: '/myMoney/moneyLock',
          name: 'moneyLock',
          component: _import('myMoney/lockWarehouse/index'),
          meta: { title: '资金锁仓' }
        },
        {
          path: '/myMoney/moneyRecharge',
          name: 'moneyRecharge',
          component: _import('myMoney/recharge/index'),
          meta: { title: '资金充值' }
        },
        {
          path: '/myMoney/moneyWithdraw',
          name: 'moneyWithdraw',
          component: _import('myMoney/withdraw/index'),
          meta: { title: '资金提现' }
        }
      ]
    },
    {
      path: '/clearMoney',
      name: 'clearMoney',
      component: _import('clearMoney/index'),
      meta: { title: '清退货币' }
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      component: _import('changePwd/index'),
      meta: { title: '修改密码' }
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: _import('changePhone/index'),
      meta: { title: '修改手机' }
    }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

