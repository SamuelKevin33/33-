// pages/recipes-content/recipes-content.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodel: true,
    array: ['炒菜', '面食', '泡菜', '汤类', '烘培'],
    multiIndex: 0,
    recipesValue: '',
    recipesType: '',
    id: ''
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var picketype = ''
    if (e.detail.value.picketype){
      picketype = that.data.array[e.detail.value.picketype]
    }else{
      picketype = that.data.recipesType
    }
    if (that.data.recipesType){
      db.collection('user-recipe').doc(that.data.id).update({
        data: {
          title: e.detail.value.recipescontent,
          ptype: picketype,
          content: e.detail.value.recipenewtext,
          hot: false
        },
        success: function(res){
          console.log('res')
          that.setData({
            showmodel: false
          })
        }
      })
    }else{
      var picketype = this.data.array[e.detail.value.picketype];
      db.collection('user-recipe').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          title: e.detail.value.recipescontent,
          ptype: picketype,
          content: e.detail.value.recipenewtext,
          hot: false
        }
      })
        .then(res => {
          this.setData({
            showmodel: false
          })
        })
    }
  
  },
  gotoRecipesList: function () {
    wx.switchTab({
      url: '/pages/recipes/recipes'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    this.setData({
      id: id
    })
    if (id) {
      db.collection('user-recipe').where({
        _id: id
      }).get({
        success: function (res) {
          that.setData({
            recipesValue: res.data[0].title,
            recipesType: res.data[0].ptype,
            recipesZheng: res.data[0].content
          })
          console.log(res.data)
        }
      })
    }
    console.log(id, '134')
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