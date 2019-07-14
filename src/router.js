import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'index',
      component: () => import('./views/index.vue'),
      children:[
        {
          path:'',
          redirect:'/home'
        },
        {
          path:'/home',
          name:'home',
          component:() => import('./views/Home.vue')
        },
        {
          path:'/order',
          name:'order',
          component:() => import('./views/Order.vue')
        },
        {
          path:'/me',
          name:'me',
          component:() => import('./views/Me.vue')
        },
        {
          path:'/address',
          name:'address',
          component:() => import('./views/Address.vue')
        },
        {
          path:'/city',
          name:'city',
          component:() => import('./views/City.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
  ]
})
// 路由守卫 必须登录才能进去其他页面
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.ele_login ? true : false
  // 判断是否在登录状态下
  if (to.path == '/login') {
    // 如果在登录页面下，一切正常显示
    next();
  } else {
    // 是否在登录状态下，不是的话就跳转到登录页面
    // isLogin ? next() : next('/login')
    next()
  }
})

export default router