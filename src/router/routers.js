export default [
  {
    path: '/',
    name: 'home',
    redirect: '/appointmentQueue',
    meta: {
      title: '首页'
    }
  },
  //登录
  {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
      meta: { title:'登录' },
  },
  //忘记密码
  {
      path: '/findPassword',
      name: 'findPassword',
      component: () => import('@/pages/FindPassword.vue'),
      meta: { title:'忘记密码' },
  },
  //设置新密码
  {
      path: '/newPassword',
      name: 'newPassword',
      component: () => import('@/pages/NewPassword.vue'),
      meta: { title:'设置新密码' },
  },
  {
    path: '/appointmentQueue',
    name: 'appointmentQueue',
    component: () => import('@/pages/appointmentQueue/appointmentQueue.vue'),
    meta: {
      title: '预约排队'
    }
  },
  {
    path: '/appointmentQueueitem',
    name: 'appointmentQueueitem',
    component: () => import('@/pages/appointmentQueue/appointmentQueueitem.vue'),
    meta: {
      title: '预约信息'
    }
  },
  {
    path: '/appointmentQueueDetail',
    name: 'appointmentQueueDetail',
    component: () => import('@/pages/appointmentQueue/appointmentQueueDetail.vue'),
    meta: {
      title: '预约详情'
    }
  },
  {
    path: '/sceneQueue',
    name: 'sceneQueue',
    component: () => import('@/pages/sceneQueue/sceneQueue.vue'),
    meta: {
      title: '现场排队'
    }
  },
  {
    path: '/queueRecord',
    name: 'queueRecord',
    component: () => import('@/pages/queueRecord/queueRecord.vue'),
    meta: {
      title: '排队记录'
    }
  }
]