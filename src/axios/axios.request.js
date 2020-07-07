
import HttpRequest from './_axios'
const baseUrl = process.env.NODE_ENV === 'development' ? '' : ''
console.log(baseUrl,'当前开发环境' + process.env.NODE_ENV)
const axios = new HttpRequest(baseUrl)
export default axios