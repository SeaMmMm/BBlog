import { createRouter, createWebHistory } from 'vue-router'
import { setUpRouter } from './guid'

const HomePage = () => import('@/views/Home')
const LoginPage = () => import('@/views/Authentication/Login')
const SignUpPage = () => import('@/views/Authentication/SignUp')
const NotFound = () => import('@/views/NotFound')
const Userpage = () => import('@/views/User')
const NavigationBar = () => import('@/views/Header/NavigationBar.vue')

const UserHome = () => import('@/views/User/Home')
const UserInfo = () => import('@/views/User/Info')
const UserMessage = () => import('@/views/User/Message')
const UserBlog = () => import('@/views/User/Blog')

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
        path: 'home',
        component: HomePage,
        meta: {
          name: 'Home',
          requiresAuth: false
        }
      },
      {
        path: 'login',
        component: LoginPage,
        meta: {
          name: 'LogIn',
          requiresAuth: false
        }
      },
      {
        path: 'signup',
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
    redirect: '/user/home',
    meta: {
      name: 'User',
      requiresAuth: true
    },
    children: [
      {
        path: 'home',
        component: UserHome,
        meta: {
          name: '主页',
          requiresAuth: true
        }
      },
      {
        path: 'info',
        component: UserInfo,
        meta: {
          name: '信息',
          requiresAuth: true
        }
      },
      {
        path: 'blog',
        component: UserBlog,
        meta: {
          name: '所有博客',
          requiresAuth: true
        }
      },
      {
        path: 'message',
        component: UserMessage,
        meta: {
          name: '个人信息',
          requiresAuth: true
        }
      }
    ]
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
