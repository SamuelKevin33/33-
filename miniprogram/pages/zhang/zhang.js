// pages/zhang/zhang.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnewnum: 0,
    listnew: [],
    num: 0
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
    var that = this;
    db.collection('user-zhang').get({
      success: function (res) {
        // console.log(res,'asdf')
        var list = [];
        list = res.data;

        for (var i in list) {

          var date = (list[i].date.getUTCMonth() + 1) + '月' + list[i].date.getUTCDate()+'号'
          list[i].datenew = date;

          if (i == 0) {
            var param_content = 'listnew[0].list[0]';
            var param_date = 'listnew[0].date';
            var param_day = 'listnew[0].day';
            var param_dateId = 'listnew[0].dateId'

            that.setData({
              [param_content]: list[0].name,
              [param_date]: date,
              [param_dateId]: list[0].date,
            })

          } else {

            if (i != 0 && list[i].datenew == list[i - 1].datenew) {

              var num = that.data.num
              var listnewnum = that.data.listnewnum + 1;
              var param_content = 'listnew[' + num + '].list[' + listnewnum + ']'

              that.setData({
                [param_content]: list[i].name,
                listnewnum: listnewnum
              })

            } else {
              var num = that.data.num + 1;
              var listnewnum = 0;
              var param_content = 'listnew[' + num + '].list[0]';
              var param_date = 'listnew[' + num + '].date';
              var param_dateId = 'listnew[' + num + '].dateId'

              that.setData({
                [param_content]: list[i].name,
                [param_date]: date,
                [param_dateId]: list[i].date,
                num: num,
                listnewnum: listnewnum
              })
            }

          }
        }
        console.log(that.data.listnew,'asdfsd')
      }
    })
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