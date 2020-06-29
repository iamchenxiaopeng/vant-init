const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'
? '/wzjxj/index/'
: '/'

module.exports = {
  publicPath: BASE_URL,
  //测试环境
  outputDir: '../../1work/nianjian/public/asset/wzjxj/index',
  indexPath: '../../../../src/view/wzjxj/default/index/index.html',
  filenameHashing:true,
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 666,
    proxy: 'http://chaotu.weiwutong.dev.cwsaas.com'
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')]
    }
  }
}
