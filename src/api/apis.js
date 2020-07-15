
import axios from '../axios/axios.request.js'

// 获取可预约的大队
export const commonAll_police_station = (params) => {
  return axios.request({
    url: '/wzjxj/common/all_police_station',
    method: 'get',
    params
  })
}

// 获取取号单列表
export const user_orderOrder_list = (params) => {
  return axios.request({
    url: '/wzjxj/user_order/order_list',
    method: 'get',
    params
  })
}

// 获取取号单详情
export const user_orderOrder_detail = (params) => {
  return axios.request({
    url: '/wzjxj/user_order/order_detail',
    method: 'get',
    params
  })
}

// 获取可预约时间段
export const commonTime_region = (params) => {
  return axios.request({
    url: '/wzjxj/common/time_region',
    method: 'get',
    params
  })
}

// 线上预约
export const user_orderCreate_order = (data) => {
  return axios.request({
    url: '/wzjxj/user_order/create_order',
    method: 'post',
    data
  })
}

// 线下扫码取号
export const user_orderScene_create_order = (data) => {
  return axios.request({
    url: '/wzjxj/user_order/scene_create_order',
    method: 'post',
    data
  })
}

// 用户取消排队
export const user_orderCancel_order = (params) => {
  return axios.request({
    url: '/wzjxj/user_order/cancel_order',
    method: 'get',
    params
  })
}

// 获取大队详情 (平台)
export const manage_stationGet_detail = (params) => {
  return axios.request({
    url: '/wzjxj/manage_station/get_detail',
    method: 'get',
    params
  })
}

// 获取大队详情 (手机)
export const commonDetail = (params) => {
  return axios.request({
    url: '/wzjxj/common/detail',
    method: 'get',
    params
  })
}

// 获取预约限制时间
export const commonLimit_day = (params) => {
  return axios.request({
    url: '/wzjxj/common/limit_day',
    method: 'get',
    params
  })
}
