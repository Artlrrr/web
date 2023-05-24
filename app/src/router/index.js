import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import RegSuccess from '@/pages/RegSuccess'
import Users from '@/pages/Users'
import UserId from '@/pages/UserId'
import CellId from '@/pages/CellId'
import OrderSuccess from '@/pages/OrderSuccess'
import MyOrders from '@/pages/MyOrders'

const routes = [
  {
    path:'/',
    component: Home
  },
  {
    path:'/catalog',
    component: Catalog
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/registration',
    component: Registration
  },
  {
    path:'/registration/success',
    component: RegSuccess
  },
  {
    path:'/users',
    component: Users
  },
  {
    path:'/users/:id',
    component: UserId
  },
  {
    path:'/cells/:id',
    component: CellId
  },
  {
    path:'/ordersuccess',
    component: OrderSuccess
  },
  {
    path:'/myorders',
    component: MyOrders
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
