import {createWebHistory, createRouter} from 'vue-router'
import Home from '../views/HomePage.vue'
import Auth from '../views/AuthPage.vue'
import Ads from '../views/AdsPage.vue'
import middleAuth from './middleware/auth'
import All from '../views/AllPage.vue'
import Choosen from '../views/ChoosenPage.vue'
import MyPost from '../views/MyPostPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            middleware: [
                middleAuth
            ]
        }
    },
    {
        path: '/all',
        name: 'all',
        component: All,
        meta: {
            middleware: [
                middleAuth
            ]
        },
    },
        {
            path: '/post/:id',
            name: 'id',
            component: Choosen,
            props: true,
            meta: {
                middleware: [
                    middleAuth
                ]
            }
            
        },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: '/ads',
        name: 'ads',
        component: Ads,
        meta: {
            middleware: [
                middleAuth
            ]
        },
    },
    {
        path: '/myPost/:user',
        name: 'user',
        component: MyPost,
        props: true,
        meta: {
            middleware: [
                middleAuth
            ]
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) =>{
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next
    }
    return middleware[0]({
        ...context
    })
})

export default router