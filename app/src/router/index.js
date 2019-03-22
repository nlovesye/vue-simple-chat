import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '@views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '@admin/Index.vue'),
    children: [
      {
        path: 'system/pages',
        name: 'pages',
        title: '视图管理',
        component: () => import(/* webpackChunkName: "Pages" */ '@admin/system/Pages.vue')
      },
      {
        path: 'demo/demo_item',
        name: 'demo_item',
        title: '用例',
        component: () => import(/* webpackChunkName: "Demo" */ '@admin/demo/Demo.vue')
      }
    ]
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

// 路由权限验证
router.beforeEach((to, from, next) => {
  // console.log('路由权限验证 roterBefore:', to)
  /*
    权限验证逻辑 start
  */
  const rand = Math.round(Math.random() * 10)
  const hasPermission = rand > -1
  // 权限验证逻辑 end
  if (hasPermission || to.path === '/login') {
    console.log('路由权限验证成功，当前随机数：', rand)
    next()
  } else {
    console.log('路由权限验证失败，请重新登录，当前随机数：', rand)
    next('/login')
  }
})

export default router
