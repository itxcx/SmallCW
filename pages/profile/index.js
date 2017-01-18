//index.js
//获取应用实例
var ywk = require('../../utils/ywk')
Page({
  data: {
    role: wx.getStorageSync('role') || '',
    proposals: [],
    from: 'profile',
    listLoad: false
  },
  filterTime (time) {
    let date = new Date(time.replace(/-/g, '/'))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : '0' + month
    let day = date.getDate()
    day = day > 9 ? day : '0' + day
    return year + '-' + month + '-' + day
  },
  getProfile () {
    if (!wx.getStorageSync('roles')) {
      ywk.ajaxJson('/api/user/profile', {}, 'GET').then((res) => {
        wx.hideToast()
        if (res.error_code === 0) {
          let roles = wx.getStorageSync('roles')
          this.setData({
            profile: this.data.role === 'c' ? roles.client : roles.freelancer
          })
        } else if (res.error_code === 80001) {
          // 去登录页面
          wx.navigateTo({
            url: '../signin/index'
          })
        } else {
          console.log(res)
        }
      }, (err) => {
        wx.hideToast()
        console.log(err)
      })
    } else {
      let roles = wx.getStorageSync('roles')
      this.setData({
        profile: this.data.role === 'c' ? roles.client : roles.freelancer
      })
    }
  },
  getInfo () {
    let operate = this.data.role === 'f' ? 'active' : 'invite'
    // 服务方获取我的投标
    ywk.ajaxJson('/api/proposal', {operate: operate}, 'GET').then((res) => {
      if (res.error_code === 0) {
        let proposals = res.proposals.map((item) => {
          item.create_at = this.filterTime(item.create_at)
          return item
        })
        console.log(proposals)
        this.setData({
          proposals: proposals,
          listLoad: true
        })
      }
      wx.hideToast()
    }, (err) => {
      wx.hideToast()
      console.log(err)
    })
  },
  changeRole () {
    if (wx.getStorageSync('roles')) {
      let profile = this.data.role === 'c' ? wx.getStorageSync('roles').freelancer : wx.getStorageSync('roles').client
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
      ywk.ajaxJson('/api/v1.1/user/role', {id: profile.id}, 'PUT').then((res) => {
        if (res.error_code === 0) {
          this.data.listLoad = false
          this.setData({
            role: this.data.role === 'c' ? 'f' : 'c',
            profile: profile
          })
          wx.setStorageSync('role', this.data.role)
          this.getInfo()
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      wx.navigateTo({
        url: `../signin/index`
      })
    }
  },
  goDetail (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../proposal-detail/index?id=${id}`
    })
  },
  goInvite (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../invite-detail/index?id=${id}`
    })
  },
  onShareAppMessage () {
    return {
      title: '云沃客',
      desc: '个人中心',
      path: '/pages/profile/index'
    }
  },
  onLoad () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    this.getProfile()
    this.getInfo()
  },
  goFreelancer () {
    wx.redirectTo({
      url: `../freelancer/index`
    })
  },
  goProject () {
    wx.redirectTo({
      url: `../project/index`
    })
  },
  goProfile () {
    return
  }
})
