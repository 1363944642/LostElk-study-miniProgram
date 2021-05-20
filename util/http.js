import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey失效，请联系开发者处理',
  3000: '期刊不存在'
}

class HTTP {
  /**
   * 接口请求封装
   * @param {url, method, data, ?success} params 
   *
   */
  request(params) {
    if(!params.method) {
      params.method="GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success:(res) => {
        let code = res.statusCode.toString()
  
        // tartsWith() 方法用于检测字符串是否以指定的前缀开始。
        if(code.startsWith('2')) {
          // 调用成功
          if(params.success) {
            params.success(res.data)
          }
        } else {
          // 服务器异常
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err) => {
        // 服务器调用失败
        this._show_error(1)
      }
    })
  }

  /**
   * 获取接口返回异常信息
   * @param {} error_code （服务端接口返回的错误码）
   * 
   */
  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}