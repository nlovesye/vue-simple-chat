import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import extensions from './extensions'
import '@plugin/iview'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(extensions)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
