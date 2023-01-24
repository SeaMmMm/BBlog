import 'animate.css' //引入animate.css
import { createApp } from 'vue'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
import naive from '../plugins/naive'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(naive)
app.use(vue3SeamlessScroll)
app.use(store)
app.use(router)

app.mount('#app')
