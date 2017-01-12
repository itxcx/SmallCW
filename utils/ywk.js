var Promise = require('./bluebird')

function assemblingData (data) {
    data = typeof (data) === 'object' ? data : {}
    data._xsrf = wx.getStorageSync('_xsrf')
    return data
}

/** ajax请求数据接口
 * [ajax请求数据接口]
 * @param  {[String]} url    [请求地址]
 * @param  {[Object||String]} data   [参数]
 * @param  {[String]} method [请求类型：默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT]
 * @return {[Promise]}        [返回结果]
 */
function ajaxJson(url, data, method = 'GET') {
  if (method !== 'GET') {
    data = assemblingData(data)
  }
  console.log(url)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://m.yunwoke.com${url}?timestamp=${new Date().getTime()}`,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'CW-Agent': ' x/1.0.0/9.2.1/iPhone/wifi'
      },
      success: function(res){
        if (res && res.data) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  ajaxJson: ajaxJson
}
