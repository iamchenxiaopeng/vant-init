import {
  successToast, 
  failToast,
  toast
} from './toast'

const myGlobal = {}
/**
 *
 * 获取当前url参数
 * @param {*} paraName
 * @returns
 */
const getUrlParam = (paraName) => {
  var url = window.location.href
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

// console
const myconsole = (arrMSG) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...arrMSG)
  }
}
/**
 * 深拷贝
 *
 * @param {*} data
 * @returns
 */
const deepClone = (data) => {
  let newObj = JSON.parse(JSON.stringify(data))
  return newObj
}

let judgeType = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 *
 * 特殊需要的深拷贝
 * @param {*} data
 * @returns
 */
const deepClone2 = (data) => {
  const type = judgeType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    // eslint-disable-next-line
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone2(data[i]))
    }
  } else if (type === 'object') {
    // 对原型上的方法也拷贝了....
    // eslint-disable-next-line
    for (const key in data) {
      obj[key] = deepClone2(data[key])
    }
  }
  return obj
}

/**
 *提交表单的时候防止误点，短时间内多次提交
 *
 * @returns true: 允许提交；false不允许提交
 */
const checkSubmit = () => {
  let interval = 1000 // 单位毫秒
  let thisTime = new Date().getTime()
  let lastTime = sessionStorage.getItem('lastTime')
  if (!lastTime) {
    sessionStorage.setItem('lastTime', new Date().getTime())
    return true
  } else {
    if (thisTime - parseInt(lastTime) <= interval) {
      sessionStorage.setItem('lastTime', new Date().getTime())
      alert('请不要重复提交！')
      return false
    }
    sessionStorage.setItem('lastTime', new Date().getTime())
    return true
  }
}

/**
 *
 * 该函数的给localstorage加了过期时间，优点是存储什么格式，取出来就是什么格式。
 * @param {*} key
 * @param {*} value
 * @param {*} time: 过期时间，以小时为单位
 */
const setLocal = (key, value, time) => {
  if (!time) {
    typeof value === 'string'
      ? localStorage.setItem(key, JSON.stringify({
        isString: true,
        value: value
      }))
      : localStorage.setItem(key, JSON.stringify({
        isString: false,
        value: JSON.stringify(value)
      }))
  } else {
    typeof value === 'string'
      ? localStorage.setItem(key, JSON.stringify({
        time: new Date().getTime() + time * 1000 * 60 * 60,
        isString: true,
        value: value
      }))
      : localStorage.setItem(key, JSON.stringify({
        time: new Date().getTime() + time * 1000 * 60 * 60,
        isString: false,
        value: JSON.stringify(value)
      }))
  }
}
const getLocal = (key) => {
  if (!localStorage.getItem(key)) {
    return null
  }
  let data = JSON.parse(localStorage.getItem(key))
  data.isString ? data.value = data.value : data.value = JSON.parse(data.value)
  if (data.time) {
    // 判断是否过期
    if (Number(data.time) < new Date().getTime()) {
      localStorage.removeItem(key)
      return null
    }
    return data.value

  }
}
// 测试上面两个函数
// setLocal('b', 3, 2000 / 1000 / 60 / 60)
// console.log(getLocal('b'))
// setTimeout(() => {
//   console.log(getLocal('b'))
// }, 1000);
// setTimeout(() => {
//   console.log(getLocal('b'))
// }, 5000);

/**
 *
 * 三元表达式
 * @param {*} expression 表达式
 * @param {*} answer1 结果1
 * @param {*} answer2 结果2
 * @returns boolean
 */
const dealTE = (expression, answer1, answer2) => {
  return expression ? answer1 : answer2
}
const clearJson = (json, reload) => {
  if (!json) {
    return
  }
  for (let key in json) {
    json[key] = ''
  }
  if (reload) {
    window.location.reload()
  }
}

const officeSuffixArr = ['doc', 'docx', 'docm', 'dotx', 'dotm', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlsb', 'xlam', 'xls', 'ppt', 'pptx', 'pptm', 'ppsx', 'ppsm', 'potx', 'potm', 'ppam']
// 验证是否office文件
const isOffice = (name) => {
  if (!name) {
    console.log('无值')
    return
  }
  let nameSplit = name.toString().split('.')
  let suffix = nameSplit[nameSplit.length - 1]
  if (officeSuffixArr.includes(suffix.toLowerCase())) {
    return true
  }
  return false
}

const isOfficeAndPdf = (name) => {
  if (!name) {
    console.log('无值')
  }
  let nameSplit = name.toString().split('.')
  let suffix = nameSplit[nameSplit.length - 1]
  console.log(suffix)
  if (suffix === 'pdf') {
    console.log('pdf')
    return true
  }
  if (officeSuffixArr.includes(suffix.toLowerCase())) {
    return true
  }
  return false
}

// 字符串删除、替换
const strDelete = (str, deletestr, replacestr) => {
  if (replacestr) {
    return str.replace(deletestr, replacestr)
  }
  return str.replace(deletestr, '')
}

const toastSuccess = (duration) => {
  successToast('成功！')
}
const toastMsuccess = (duration) => {
  successToast('操作成功！')
}

// 一个json给另一个json赋值
const jsonAssign = (target, dataJson) => {
  if (!target || !dataJson) return
  for (let key in target){
    target[key] = dataJson[key]
  }
}

// 规范时间
const normtime = (time, fullTime) => {
  let getDate = new Date(time)
  let o = {
    'Y': getDate.getFullYear(),
    'M': (getDate.getMonth() + 1) < 10 ? ('0' + (getDate.getMonth() + 1)) : (getDate.getMonth() + 1),
    'd': getDate.getDate() < 10 ? ('0' + getDate.getDate()) : getDate.getDate(),
    'w': getDate.getDay() < 10 ? ('0' + getDate.getDay()) : getDate.getDay(),
    'h': getDate.getHours() < 10 ? ('0' + getDate.getHours()) : getDate.getHours(),
    'm': getDate.getMinutes() < 10 ? ('0' + getDate.getMinutes()) : getDate.getMinutes(),
    's': getDate.getSeconds() < 10 ? ('0' + getDate.getSeconds()) : getDate.getSeconds(),
  };
  if(fullTime){
    return o.Y + '-' + o.M + '-' + o.d + '-' + o.h + '-' + o.m + '-' + o.s
  }
  return o.Y + '-' + o.M + '-' + o.d
}

const dealHttp = (res, callback) => {
  if(!res.data.errCode){
    callback(res)
  }else{
    failToast(res.data.message)
  }
}


const previewURL = document.domain.indexOf('localhost') !== -1 ? '' : '/web/api/export'
let uRole = () => localStorage.getItem('user')
const onDayMill = 1000 * 60 * 60 * 24

myGlobal.window = window
myGlobal.previewURL = previewURL
myGlobal.c = myconsole
myGlobal.deepClone = deepClone
myGlobal.deepClone2 = deepClone2
myGlobal.checkSubmit = checkSubmit
myGlobal.setLocal = setLocal
myGlobal.getLocal = getLocal
myGlobal.dealTE = dealTE
myGlobal.getUrlParam = getUrlParam
myGlobal.clearJson = clearJson
myGlobal.isOffice = isOffice
myGlobal.isOfficeAndPdf = isOfficeAndPdf
myGlobal.strDelete = strDelete
myGlobal.toastSuccess = toastSuccess
myGlobal.toastMsuccess = toastMsuccess
myGlobal.uRole = uRole
myGlobal.onDayMill = onDayMill
myGlobal.jsonAssign = jsonAssign
myGlobal.normtime = normtime
myGlobal.dealHttp = dealHttp
myGlobal.toast = toast
export default myGlobal