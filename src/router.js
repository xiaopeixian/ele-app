import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 设置链接激活时使用的 CSS 类名
  linkActiveClass:"active",
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
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path:'/search',
      name:'search',
      component:() => import('./views/Search.vue')
    },
    {
      path:'/shop',
      name:'shop',
      redirect:'/goods',
      // 实现默认路由
      component:() => import('./views/shop/Shop.vue'),
      children:[
        {
          path:'/goods',
          name:'goods',
          component:() => import('./views/shop/Goods.vue')
        },
        {
          path:'/comments',
          name:'comments',
          component:() => import('./views/shop/Comments.vue')
        },
        {
          path:'/seller',
          name:'seller',
          component:() => import('./views/shop/Seller.vue')
        },
      ]
    },
    {
      path:'/myAddress',
      name:'myAddress',
      component:() => import('./views/orders/MyAddress.vue'),
    },
    {
      path:'/addAddress',
      name:'addAddress',
      component:() => import('./views/orders/AddAddress.vue'),
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
    isLogin ? next() : next('/login')
    next()
  }
})

export default router