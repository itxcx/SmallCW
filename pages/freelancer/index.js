//index.js
var ywk = require('../../utils/ywk')

Page({
  data: {
    users: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showLoading()
    ywk.ajaxJson('/api/freelancers/search', {}, 'GET').then((res) => {
      this.users = res.users
      console.log(this.users)
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.hideLoading()
    })
  }
})
