import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  name: 'home',
  component: Home
},
{
  path: '/list',
  name: 'List',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import('../views/List.vue')
},
{
  path: '/cart',
  name: 'Cart',
  component: () => import('../views/Cart.vue')
},
{
  path: '/my',
  name: 'My',
  component: () => import('../views/My.vue')
},
{
  path: '/search',
  name: 'Search',
  children: [{
    path: '/',
    name: 'index',
    component: () => import('../views/search/Search-index.vue')
  },
  {
    path: 'list',
    name: 'list',
    component: () => import('../views/search/Search-list.vue')
  }
  ],
  component: () => import('../views/Search.vue')
},
{
  path: '/detail',
  name: 'Detail',
  meta: {
    keepAlive: true
  },
  component: () => import('../views/Detail.vue')
},
{
  path: '/login',
  name: 'Login',
  component: () => import('../views/login/Login.vue')
},
{
  path: '/userLogin',
  name: 'UserLogin',
  component: () => import('../views/login/UserLogin.vue')
},
{
  path: '/register',
  name: 'Register',
  component: () => import('../views/login/Register.vue')
},
{
  path: '/path',
  name: 'Path',
  children: [{
    path: '/',
    name: 'PathIndex',
    component: () => import('../views/path/Path-Index.vue')
  },
  {
    path: 'path-list',
    name: 'Path-List',
    component: () => import('../views/path/Path-List.vue')
  }
  ],
  component: () => import('../views/Path.vue')
},
{
  path: '/order',
  meta: {
    keepAlive: true
  },
  name: 'Order',
  component: () => import('../views/Order.vue')
},
{
  path: '/payment',
  name: 'Payment',
  component: () =>
    import('../views/Payment.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = ['Cart', 'Path', 'PathIndex', 'Payment', 'Order', 'Path-List']
  // 获取登录的证明
  const userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
  // indexOf判断数组里面  没有则为-1
  if (isLogin.indexOf(to.name) >= 0) {
    console.log(1)
    if (!userInfo) {
      router.push('/login')
    }
  }
  next()
})
export default router
