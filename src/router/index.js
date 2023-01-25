import { createRouter, createWebHistory } from 'vue-router'
import { setUpRouter } from './guid'

const HomePage = () => import('@/views/Home')
const LoginPage = () => import('@/views/Authentication/Login')
const SignUpPage = () => import('@/views/Authentication/SignUp')
const NotFound = () => import('@/views/NotFound')
const Userpage = () => import('@/views/User')
const NavigationBar = () => import('@/views/Header/NavigationBar.vue')

const routes = [
  {
    path: '/',
    component: NavigationBar,
    meta: {
      name: 'NavigationBar',
      requiresAuth: false
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: HomePage,
        meta: {
          name: 'Home',
          requiresAuth: false
        }
      },
      {
        path: '/login',
        component: LoginPage,
        meta: {
          name: 'LogIn',
          requiresAuth: false
        }
      },
      {
        path: '/signup',
        component: SignUpPage,
        meta: {
          name: 'SignUp',
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: Userpage,
    meta: {
      name: 'User',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

setUpRouter(router)

export default router
