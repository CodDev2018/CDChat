import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const isAuthorized = (to, from, next) => {
    if (!sessionStorage.user) {
      return next('/')
    }
    next()
  }

const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/channels',
            name: 'channels',
            component: () => import('./views/Channels.vue'),
            beforeEnter: isAuthorized
        },
        {
            path: '/channel/:name',
            name: 'channel',
            component: () => import('./views/Channel.vue'),
            props: true,
            beforeEnter: isAuthorized
        }
    ]
})


export default router