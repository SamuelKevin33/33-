// pages/recipes/recipes.js
const db = wx.cloud.database();
Page({
  selectAll: function(){
    this.setData({
      filterList: this.data.recipeList
    })
    // this.data.filterList = this.data.recipeList;
  },
  selectType: function (e) {
    var that = this;
    var list = []
    for (var z in that.data.recipeList) {
      if (that.data.recipeList[z].ptype == that.data.typeList[e.detail.value]) {
        list = list.concat(that.data.recipeList[z])
      }
    }
    that.setData({
      filterList: list
    })
  },
  selectHot: function () {
    var that = this;
    var list = []
    for (var j in that.data.recipeList) {
      if (that.data.recipeList[j].hot == true) {
        list = list.concat(that.data.recipeList[j])
      }
    }
    that.setData({
      filterList: list
    })
    // this.data.recipeList = this.data.recipeList;
  },
  gotoUpdate: function(e){
    wx.redirectTo({
      url: '/pages/recipes-content/recipes-content?id=' + e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id,'123')
  },
  searchList: function(){
    var that = this;
    var content = that.data.searchcontent;
    // console.log(that.data.searchcontent, 'find')
    var list = that.data.recipeList;
    var listnew = [];
    for (var i in list){
      if(list[i].title == content){
        listnew = listnew.concat(list[i])
      }
    }
    that.setData({
      filterList: listnew
    })
  },
  changeInp: function(e){
    var content = e.detail.value;
    this.setData({
      searchcontent: content
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    searchcontent: '',
    recipeList: [],
    filterList: [],
    typeList: []
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
        var listnew = {};
        var listneww = [];
        list = res.data;
        for (var i in list) {
          if (!listnew[list[i].ptype]){
            listnew[list[i].ptype] = list[i].ptype;
            listneww[i] = list[i].ptype;
          }
        }
        that.setData({
          recipeList: list,
          filterList: list,
          typeList: listneww
        })
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