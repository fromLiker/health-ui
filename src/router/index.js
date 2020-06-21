import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/',
    name: 'getnumber',
    component: () => import('../components/getnumber/index.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/index.vue'),
    hidden: true
  },
  {
    path:'/precondition',
    name:'precondition',
    component:() => import('../components/precondition/index.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../components/recommend/index.vue')
  },
  {
    path:'/completed',
    name: 'completed',
    component:() => import('../components/completed/index.vue')
  },
  {
    path: '/completedProject',
    name: 'completedProject',
    component: () => import('../components/completedProject/index.vue')
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: () => import('../components/confirmation/index.vue')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: () => import('../components/doctor/index.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../components/address/index.vue')
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
