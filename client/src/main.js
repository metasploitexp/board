import { createApp} from 'vue'
import {store} from './store'
import App from './App.vue'
import router from './router'
import Axios from 'axios'


const app = createApp(App)
Axios.defaults.baseURL = 'http://localhost:5000'
Axios.defaults.headers = { 'Content-Type': 'application/json', 'X-Authorization': localStorage.getItem('auth') }

app.config.globalProperties.$axios = Axios

app.use(store).use(router).mount('#app')
