import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Maska from 'maska'
import store from './store'


const app = createApp(App)

app.use(Maska);
app.use(store);
app.mount('#app')