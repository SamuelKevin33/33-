// pages/recipes-content/recipes-content.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: true,
    array: ['炒菜', '面食', '泡菜', '汤类','烘培'],
    multiIndex: 0
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(this.data,'123')
    // db.collection('user-recipe').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     title: e.detail.value.recipescontent,
    //     ptype: e.detail.value.picketype,
    //     content: e.detail.value.recipenewtext,
    //     hot: false
    //   }
    // })
    //   .then(res => {
    //     this.setData({
    //       showmodel: false
    //     })
    //     // this.setData({ contentValue: ''});

    //   })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})