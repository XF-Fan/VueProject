import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() 
//用原型链新建一个事件总线$bus，用来传递接收无法用父子通信的信息

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
