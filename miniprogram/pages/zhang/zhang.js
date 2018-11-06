// pages/zhang/zhang.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnewnum: 0,
    listnew: [],
    num: 0,
    zhang: 6000,
    zhi: 0,
    yu: 0,
    showmodel: false
  },
  formSubmit: function(e){
    db.collection('user-zhang').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        date: new Date(),
        name: e.detail.value.name,
        zhang: e.detail.value.zhang,
        type: e.detail.value.ztype,
      }
    })
      .then(res => {
        this.setData({
          showmodel: false
        })
        wx.switchTab({
          url: '/pages/zhang/zhang?id=2'
        })
        // this.setData({ contentValue: ''});

      })
  },
  showmodal: function(){
    this.setData({
      showmodel: true
    })
  },
  closemodal: function () {
    this.setData({
      showmodel: false
    })
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
            var param_content = 'listnew[0].list[0].name';
            var param_date = 'listnew[0].date';
            var param_type = 'listnew[0].list[0].zhang';
            var param_dateId = 'listnew[0].dateId';
            var param_shou = 'listnew[0].shou';
            var param_zhi = 'listnew[0].zhi';
            if(list[0].type == 1){
              var zhi = list[0].zhang;
              var shou = 0;
              list[0].zhang = -list[0].zhang;
            }else{
              var shou = list[0].zhang;
              var zhi = 0;
            }
            var yu = that.data.zhang+list[0].zhang;
            var zongZhi = that.data.zhi+ zhi;
            that.setData({
              [param_content]: list[0].name,
              [param_type]: list[0].zhang,
              [param_date]: date,
              [param_dateId]: list[0].date,
              [param_shou]: shou,
              [param_zhi]: zhi,
              yu: yu,
              zhi: zongZhi
            })

          } else {
            if (i != 0 && list[i].datenew == list[i - 1].datenew) {

              var num = that.data.num
              var listnewnum = that.data.listnewnum + 1;
              var param_content = 'listnew[' + num + '].list[' + listnewnum + '].name';
              var param_zhang = 'listnew[' + num + '].list[' + listnewnum + '].zhang';
              var param_shou = 'listnew[' + num + '].shou';
              var param_zhi = 'listnew[' + num + '].zhi';
              if (list[i].type == 1) {
                var zhi = parseInt(that.data.listnew[num].zhi) + parseInt(list[i].zhang);
                list[i].zhang = -list[i].zhang;
                var shou = that.data.listnew[num].shou;
                
              } else {
                var shou = parseInt(that.data.listnew[num].shou) + parseInt(list[i].zhang);
                var zhi = that.data.listnew[num].zhi;
              }
              var yu = parseInt(that.data.yu) + parseInt(list[i].zhang);
              var zongZhi = that.data.zhi + zhi;
              that.setData({
                [param_content]: list[i].name,
                [param_zhang]: list[i].zhang,
                listnewnum: listnewnum,
                [param_shou]: shou,
                [param_zhi]: zhi,
                yu: yu,
                zhi: zongZhi
              })
            } else {
              var num = that.data.num + 1;
              var listnewnum = 0;
              if (list[i].type == 1) {
                var zhi = list[i].zhang;
                var shou = 0;
                list[i].zhang = -list[i].zhang;
              } else {
                var shou = list[i].zhang;
                var zhi = 0;
              }
              var yu = parseInt(that.data.yu) + parseInt(list[i].zhang);
              var zongZhi = that.data.zhi + zhi;
              var param_content = 'listnew[' + num + '].list[0].name';
              var param_zhang = 'listnew[' + num +'].list[0].zhang';
              var param_date = 'listnew[' + num + '].date';
              var param_dateId = 'listnew[' + num + '].dateId';
              var param_shou = 'listnew[' + num + '].shou';
              var param_zhi = 'listnew[' + num + '].zhi';
              // console.log(param_zhang, list[i].zhang)

              that.setData({
                [param_content]: list[i].name,
                [param_zhang]: list[i].zhang,
                [param_date]: date,
                [param_dateId]: list[i].date,
                num: num,
                listnewnum: listnewnum,
                [param_shou]: shou,
                [param_zhi]: zhi,
                yu: yu,
                zhi: zongZhi
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