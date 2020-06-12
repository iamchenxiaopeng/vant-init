import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible'
import 'postcss-pxtorem'
import '@/assets/iconfont/iconfont.css'
import myGlobal from '@/utils/global'
import VueWechatTitle from 'vue-wechat-title'
import { Button,ImagePreview,Toast,Icon,Overlay,Cell, CellGroup, Dialog,Tab, Tabs,NavBar,NoticeBar,Field,DatetimePicker,Popup } from 'vant';

Vue.use(VueWechatTitle)
Vue.use(Button)
Vue.use(ImagePreview)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Overlay)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(NoticeBar)
Vue.use(Field)
Vue.use(DatetimePicker)
Vue.use(Popup)

Vue.filter('getDate', function (value) {
  if (!value) return ''
  let nowTime = new Date(value)
  let t = {
    y: nowTime.getFullYear(),
    m: nowTime.getMonth()<9?'0'+(nowTime.getMonth()+1):(nowTime.getMonth()+1),
    d: nowTime.getDate()<10?'0'+nowTime.getDate():nowTime.getDate(),
  }
  return t.y + '-' + t.m + '-' + t.d
})

Vue.filter('dealtime', function (value) {
  if (!value) return ''
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

