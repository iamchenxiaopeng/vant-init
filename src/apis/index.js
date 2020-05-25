
import axios from '../axios/axios.request.js'

export const getPicList = (params) => {
  return axios.request({
    url: 'api/web/getpic',
    params: params,
    method: 'get'
  })
}