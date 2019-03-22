import axios from 'axios'
import methods from './methods'

const BasicAuth = 'Basic YXBwOjEyMzQ1Ng=='

// console.log(process.env.NODE_ENV)
const INSTANCE_CONFIG = process.env.NODE_ENV === 'development' ? {
  timeout: 1000 * 10,
  withCredentials: true
} : {
  // proxy: 'scm.smartcomma.com',
  // baseURL: 'https://scm.smartcomma.com/api/',
  timeout: 1000 * 10,
  withCredentials: true
}

let axiosInstance = axios.create(INSTANCE_CONFIG)

/* 请求拦截器 */
axiosInstance.interceptors.request.use(config => {
  let newConfig = config
  if (config.url === '/oauth/token') {
    newConfig = Object.assign({}, config, {
      headers: {
        ...config.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': BasicAuth
      }
    })
  } else {
    const token = window.localStorage.getItem('access_token')
    newConfig = Object.assign({}, config, {
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  // console.log('config', newConfig, window.localStorage)
  return newConfig
}, error => {
  console.error('[请求拦截器错误]', error)
  throw error
  // return Promise.reject(error)
})

/* 响应拦截器 */
axiosInstance.interceptors.response.use(response => {
  console.info(`[${response.config.url}]返回数据:`, response.data)
  return response.data
}, error => {
  console.error('[响应拦截器错误]', error)
  throw error
  // return Promise.reject(error)
})

for (const method in methods) {
  if (methods.hasOwnProperty(method)) {
    axiosInstance[method] = methods[method]
  }
}

export default axiosInstance
