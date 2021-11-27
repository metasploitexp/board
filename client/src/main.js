<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import router from './router'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
=======
import { createApp} from 'vue'
import {store} from './store'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d

const app = createApp(App)
Axios.defaults.baseURL = 'http://localhost:5000'
Axios.defaults.headers = { 'Content-Type': 'application/json', 'X-Authorization': localStorage.getItem('auth') }

app.config.globalProperties.$axios = Axios
<<<<<<< HEAD
=======

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
app.use(store).use(router).mount('#app')
