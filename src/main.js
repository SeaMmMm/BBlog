import { createApp } from 'vue'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
import naive from '../plugins/naive'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css' //引入animate.css

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBkcyAQB2Foqns1qnqleta15swpWpVAw9E',
  authDomain: 'bblog-3168b.firebaseapp.com',
  projectId: 'bblog-3168b',
  storageBucket: 'bblog-3168b.appspot.com',
  messagingSenderId: '267843887237',
  appId: '1:267843887237:web:06a7f7eecf519a44df49ec',
  measurementId: 'G-8BNXDL3DFQ'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()
let app = null

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(naive)
    app.use(vue3SeamlessScroll)
    app.use(store)
    app.use(router)
    app.mount('#app')
  }
})
