import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast)

const durationTime = 2000
const toastDefaultFn = () => {}

export const successToast = (message = '成功！',duration = durationTime, forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.success({
    message,
    duration,
    forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})

export const loadingToast = (message = '加载中...',duration = durationTime, forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.loading({
    message,
    duration,
    forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})

export const failToast = (message = '失败！',duration = durationTime, forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => Toast.fail({
    message,
    duration,
    forbidClick,
    overlay: forbidClick,
    onClose: onClose(),
    onOpened: onOpened()
})

export const toast = (type = 'success', message, duration = durationTime, forbidClick = false, onOpened = toastDefaultFn, onClose = toastDefaultFn) => {
    Toast[type]({
        message,
        duration,
        forbidClick,
        overlay: forbidClick,
        onClose: onClose(),
        onOpened: onOpened()
    })
}
