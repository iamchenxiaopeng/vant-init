import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast)

const toastDefaultFn = () => {}

export const successToast = (message = '成功！',duration = 2000,forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.success({
    message: message,
    duration: duration,
    forbidClick: forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})

export const loadingToast = (message = '加载中...',duration = 2000,forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.loading({
    message: message,
    duration: duration,
    forbidClick: forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})

export const failToast = (message = '失败！',duration = 2000,forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.loading({
    message: message,
    duration: duration,
    forbidClick: forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})
