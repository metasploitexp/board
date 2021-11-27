import {createWebHistory, createRouter} from 'vue-router'
<<<<<<< HEAD
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
=======
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
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
    },
    {
        path: '/all',
        name: 'all',
        component: All,
        meta: {
            middleware: [
<<<<<<< HEAD
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
=======
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
>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
            ]
        }
    }
]

<<<<<<< HEAD
=======

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
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