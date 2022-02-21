import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import global from './assets/js/global'
import './assets/css/common.less'

// 导入所有组件
import Vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)
app.use(Vant).use(store).use(router).mount('#app')

app.config.globalProperties._global  = global