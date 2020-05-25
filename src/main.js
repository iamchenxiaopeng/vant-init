import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'lib-flexible'
import 'postcss-pxtorem'
import { Button } from 'vant';

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
