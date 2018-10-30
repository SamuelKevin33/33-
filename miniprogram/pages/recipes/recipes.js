// pages/recipes/recipes.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeList: []

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
    db.collection('user-recipe').orderBy('_id', 'desc').get({
      success: function (res) {
        var list = [];
        list = res.data;
        that.setData({
          recipeList: res.data
        })
        console.log(list);
        // for (var i in list) {

        //   var date = list[i].date.getUTCMonth() + '/' + list[i].date.getUTCFullYear()
        //   var day = list[i].date.getUTCDate()
        //   list[i].day = day
        //   list[i].datenew = date;

        //   if (i == 0) {
        //     var param_content = 'listnew[0].list[0]';
        //     var param_date = 'listnew[0].date';
        //     var param_day = 'listnew[0].day';
        //     var param_dateId = 'listnew[0].dateId'

        //     that.setData({
        //       [param_content]: list[0].content,
        //       [param_date]: date,
        //       [param_day]: day,
        //       [param_dateId]: list[0].date,
        //     })

        //   } else {

        //     if (i != 0 && list[i].datenew == list[i - 1].datenew && list[i].day == list[i - 1].day) {

        //       var num = that.data.num
        //       var listnewnum = that.data.listnewnum + 1;
        //       var param_content = 'listnew[' + num + '].list[' + listnewnum + ']'

        //       that.setData({
        //         [param_content]: list[i].content,
        //         listnewnum: listnewnum
        //       })

        //     } else {

        //       var num = that.data.num + 1;
        //       var listnewnum = 0;
        //       var param_content = 'listnew[' + num + '].list[0]';
        //       var param_date = 'listnew[' + num + '].date';
        //       var param_day = 'listnew[' + num + '].day';
        //       var param_dateId = 'listnew[' + num + '].dateId'

        //       that.setData({
        //         [param_content]: list[i].content,
        //         [param_date]: date,
        //         [param_day]: day,
        //         [param_dateId]: list[i].date,
        //         num: num,
        //         listnewnum: listnewnum
        //       })

        //     }

        //   }
        // }

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