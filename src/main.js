import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '/assets/styles/index.css'
import '/assets/styles/variables.css'
import { http } from './utils/index'
import Directive from './directive'


const installPack = (key, value) => {
  return {
    install: function(app) {
      app.config.globalProperties[key] = value
    }
  } 
}


const app = createApp(App)
app.use(router)
app.use(Directive)
app.use(installPack('$http', http))
app.provide('$http', http)
app.mount('#app')
