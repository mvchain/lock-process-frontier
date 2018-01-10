import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = window.sessionStorage.getItem('mvcUser')
  if (!token && to.path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
