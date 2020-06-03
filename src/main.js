import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible'
import 'postcss-pxtorem'
import '@/assets/iconfont/iconfont.css'
// import '@/assets/css/global.css'
import myGlobal from '@/utils/global'
import { Button,ImagePreview,Toast,Icon, } from 'vant';

Vue.use(Button)
Vue.use(ImagePreview)
Vue.use(Toast)
Vue.use(Icon)

Vue.filter('dealtime', function (value) {
  if (!value) return ''
  value = value.toString()
  let nowTime = new Date(value);
  return (nowTime.getMonth() + 1) + '月' + nowTime.getDate() + '日'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$myGlobal = myGlobal

