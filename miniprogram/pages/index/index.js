//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    dateInfo: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    money_sum: 123,
    list_num: 3,
    recipeLen: 0,
    noteLen: 0,
    zong: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    
  },
  onReady: function () {
    this.getUserInfo();
    var that = this;
    db.collection('user-note').get({
      success: function (res) {
        that.setData({
          noteLen: res.data.length
        });
        // console.log(res.data, 'd')
      }
    })
    db.collection('user-recipe').get({
      success: function (res) {
        var list = [];
        var listnew = {};
        var listneww = 0;
        list = res.data;
        for (var i in list) {
          if (!listnew[list[i].ptype]) {
            listnew[list[i].ptype] = list[i].ptype;
            listneww = listneww + 1;
            // console.log(listneww)
          }
        }
        that.setData({
          recipeType: listneww,
          recipeLen: res.data.length
        });
        // console.log(res.data, 'd')
      }
    })
    var date = new Date();
    var dateString = date.getUTCFullYear() + '年' + (date.getUTCMonth()+1) + '月' + date.getUTCDate() + '日';
    this.setData({ dateInfo: dateString });
    db.collection('user-zhang').get({
      success: function (res) {
        var list = res.data;
        var zong = 6000;
        for (var i in list){
          if(list[i].type == 1){
            zong = parseInt(zong) - parseInt(list[i].zhang);
          }else{
            zong = parseInt(zong) + parseInt(list[i].zhang);
          }
        }
        that.setData({
          zong : zong
        })
        // console.log(zong,'fsfd')
      }
    });
  },
  getUserInfo: function (e) {
    // console.log(e)
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
