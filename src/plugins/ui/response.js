export default {
    install: function (Vue, options) {
        Vue.prototype.$alert = function (message, title) {
            title = title || '提示信息'
            this.$dialog.alert({message: message, title: title})
        }
        Vue.prototype.$showLoading = function (message, duration) {
            this.$toast.loading({
                mask: true,
                message: message || '加载中',
                duration: duration == undefined ? 60000 : duration
            })
        }
        Vue.prototype.$closeToast = function () {
            this.$toast.clear()
        }
        Vue.prototype.$confirm = function (config, confrm, cancel) {
            this.$dialog.confirm({
                title: config.title || '确认信息',
                message: config.message || '确定要进行此操作吗'
            }).then(() => {
                confrm()
            }).catch(() => {
                cancel()
            });
        }
        Vue.prototype.$fail = function (message) {
            this.$toast.fail(message);
        }
    }
}