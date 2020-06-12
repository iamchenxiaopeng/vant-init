import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
      document.body.appendChild(hackIframe);
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
  }
})

Vue.use(Router)
export default router