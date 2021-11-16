import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

export const store = createStore({
    modules: {
        User: {
            namespaced: true,
            state() {
                return {
                    isAuthenticated: !!localStorage.getItem('auth'),
                    id: localStorage.getItem('id')   
                }
            },
            mutations: {
                changeLog(state) {
                    state.isAuthenticated = !state.isAuthenticated
                },
            },
            actions: {
                async logIn({commit}, { login, password }) {
                    const response = await axios.post('/api/auth/login', {
                        login,
                        password,
                    })
                    if(response.data) {
                        commit('changeLog')
                        localStorage.setItem('auth', response.data.token)
                        localStorage.setItem('id', response.data.userId)
                        router.push({name: 'home', query: {redirect: '/'}})
                    }
                },
                logOut({commit}) {
                   if (localStorage.getItem('auth')) {
                    localStorage.removeItem('auth')
                    localStorage.removeItem('id')
                    commit('changeLog')
                    router.push({name: 'auth', query: {redirect: '/auth'}})
                   }
                },
                async register({commit},{ email, login, password }) {
                    const response = await axios.post('/api/auth/register', {
                        email,
                        login,
                        password
                    })
                    if (response.data) {
                        commit('changeLog')
                        localStorage.setItem('auth', response.data.token)
                        localStorage.setItem('id', response.data.userId)
                        router.push({name: 'home', query: {redirect: '/'}})
                    }
                }
            }
        },  
    }
})

