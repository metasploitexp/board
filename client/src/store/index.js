import {createStore} from 'vuex'
import axios from 'axios'
import router from '../router'

export const store = createStore({
    modules: {
        User : {
            namespaced: true,
            state() {
                return {
                    isAuthenticated: localStorage.getItem('auth') ? true : false,
                }
            },
            mutations: {
                changeAuth(state) {
                    state.isAuthenticated = !state.isAuthenticated
                },
            },
            actions: {
                async register({commit}, {email, login, password}) {
                    const response = await axios.post('/api/auth/register', {
                        email,
                        login,
                        password
                    })
                    if (response.status == 200) {
                        commit('changeAuth')
                        localStorage.setItem('auth', response.data.token)
                        localStorage.setItem('id', response.data.userId)
                        router.push({name: 'all', query: {redirect: '/all'}})
                    }
                },
                async logIn({commit}, {login, password}) {
                    const response = await axios.post('/api/auth/logIn', {
                        login,
                        password
                    })
                    if (response.status == 200) {
                        localStorage.setItem('auth', response.data.token)
                        localStorage.setItem('id', response.data.userId)
                        commit('changeAuth')
                        router.push({name: 'all', query: {redirect: '/all'}})
                    }
                },
                logOut({commit}) {
                    if (localStorage.getItem('auth')) {
                        commit('changeAuth')
                        localStorage.removeItem('auth')
                        localStorage.removeItem('id')
                        router.push({name: 'auth', query: {redirect: '/auth'}})
                    } 
                }
            }
        },
        Post: {
            namespaced: true,
            state() {
                return {
                    isCreate: false,
                    id: localStorage.getItem('id')
                }
            },
            mutations: {
                changeCreate(state) {
                    state.isCreate = !state.isCreate
                },
                message(state) {
                    if (state.isCreate) {
                        return true
                    }
                },
            },
            actions: {
                async create({commit, state}, options) {
                    try {
                        const fd = new FormData()
                        for(let i = 0; i < options.files.length; i++) {
                            let file = options.files[i]
                            fd.append('files', file)
                        }
                        fd.append('title', options.title)
                        fd.append('description', options.description)
                        fd.append('id', state.id)
                        fd.append('category', options.category)
                        const response = await axios.post('/api/post/add', fd)
                        if (response.status == 200) {
                            commit('changeCreate')
                        }
                        const created = commit('message')
                        if(created) {
                            commit('changeCreate')
                            return {message: 'Post has been created!'}
                        }
                    } catch (error) {
                        return error
                    }
                },
                async getPost(context, data) {
                    try {
                        const response = await axios.get(`/api/post/all/${data.postId}`)
                        if (response.data) {
                            return response.data
                        } 
                    } catch (error) {
                        return error
                    }
                },
                async getMyPosts(context, data) {
                    try {
                        const response = await axios.get(`/api/post/myPosts/${data.id}`)
                        if (response.status == 200) {
                            return response.data
                        } 
                    } catch (error) {
                        return error
                    }
                },
                async updatePost(context, data) {
                    try {
                        const response = await axios.post('/api/post/myPosts/update', data)
                        if (response.status == 200) {
                            console.log('Post updated successfully')
                        } else {
                            console.log('Error updating post...')
                        }
                    } catch (error) {
                        return error
                    }
                },
                async deletePost(context, data) {
                    try {
                        const response = await axios.post('/api/post/myPosts/delete', data)
                        if (response.status == 200) {
                            console.log('Post deleted successfully!')
                        } else {
                            console.log('Error deleting post: ' + response.status)
                        }
                    } catch (error) {
                        return error
                    }
                },
                async searchPost(context, data) {
                    try {
                        const response = await axios.post('/api/post/search', data)
                        if (response.status === 200) {
                            return response.data
                        } else {
                            return []
                        }
                    } catch (error) {
                        return error
                    }
                }
            }
        }
    }
})
