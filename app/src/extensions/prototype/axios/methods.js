import oAxios from './index'

const oGET = (url, opt) => {
  return oAxios.get(url, opt)
}

const oPOST = (url, opt) => {
  return oAxios.post(url, opt)
}

export default {
  oGET,
  oPOST
}
