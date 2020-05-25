module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    'autoprefixer': {
      overrideBrowserslist: [
        'Android >= 4.0', 'iOS >= 8'
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  }
}