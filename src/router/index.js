import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home',
  },
  {
    path:'/home',
    component:() => import('@/views/Home')
  },
  {
    path:'/report',
    component:()=>import('@/components/Report')
  },
  {
    path:'/province',
    component:()=>import('@/components/Province')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
