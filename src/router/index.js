import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import UserView from '../views/UserView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{reqAuth:true}
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta:{reqAuth:true}

  },
  {
    path:'/:catchAll(.*)',
    name:'notFound',
    component:NotFoundView
  },
  {
    path:'/user/:id',
    name:'user',
    component:UserView,
    meta:{reqAuth:true},
    props:true
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  const loggedIn = localStorage.getItem('user')
  if(to.meta.reqAuth && !loggedIn) next('/login')
  if((to.fullPath === '/login' || to.fullPath === '/register') && loggedIn) next('/')
  next()
})

export default router
