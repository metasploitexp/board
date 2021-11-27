import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import router from './router'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
Axios.defaults.baseURL = 'http://localhost:5000'
Axios.defaults.headers = { 'Content-Type': 'application/json', 'X-Authorization': localStorage.getItem('auth') }

app.config.globalProperties.$axios = Axios
app.use(store).use(router).mount('#app')
