import {createWebHistory, createRouter} from 'vue-router'
import Auth from '../view/AuthPage.vue'
import Register from '../view/RegPage.vue'
import middleware from './middleware/auth'
import All from '../view/AllPage.vue'
import Create from '../view/CreatePage.vue'
import myPosts from '../view/MyPostsPage.vue'
import Post from '../view/PostPage.vue'

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: '/all',
        name: 'all',
        component: All,
        meta: {
            middleware: [
                middleware
            ]
        }
    },
    {
        path: '/create',
        name: 'create',
        component: Create,
        meta: {
            middleware: [
                middleware
            ]
        }
    },
    {
        path: '/myPosts',
        name: 'myPosts',
        component: myPosts,
        meta: {
            middleware: [
                middleware
            ]
        }
    },
    {
        path: '/all/:id',
        name: 'id',
        component: Post,
        props: true,
        meta: {
            middleware: [
                middleware
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