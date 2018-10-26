// pages/note/note.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // note_list: [{
    //   day: 23,
    //   date: '2213/2',
    //   list: ['淡蓝色和粉色的搭配多用于表达爱情等主题，同时也是夏天的标准配色，明亮的粉色和蓝色给人舒畅和清凉的感觉，整个配色明度较高，色彩纯度较高却并不显得过分绚丽，也常用于表达小资情调的设计中。','新的项目添加到列表']
    // },
    // {
    //   day: 1,
    //   date: '2213/2',
    //   list: ['淡蓝色和粉色的搭配多用于表达爱情等主题，同时也是夏天的标准配色，明亮的粉色和蓝色给人舒畅和清凉的感觉，整个配色明度较高，色彩纯度较高却并不显得过分绚丽，也常用于表达小资情调的设计中。', '新的项目添加到列表']
    // },
    // {
    //   day: 12,
    //   date: '2213/2',
    //   list: ['果列表中项目的位置', '新的项目添加到列表']
    // }],
    note_list: [],
  },
  wash: function(arr){
    
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
    db.collection('user-note').get({
      success: function (res) {
        var list = [];
        var num = 0;
        console.log(res.data, "123")
        list = res.data;
        var listnew = [];
        for (var i in list) {
          
          var date = list[i].date.getUTCMonth() + '/' + list[i].date.getUTCFullYear()
          var day = list[i].date.getUTCDate()
          if(i==0){
            listnew[num].list.push(list[i].content);
            listnew[num].date = date;
            listnew[num].day = day;
            console.log(1)
          }
          console.log(3)
          if (i!=0 && list[i].date == list[i - 1].date){
            listnew[num].list.push(list[i].content);
          }else{
            num++;
            listnew[num].list.push(list[i].content);
            listnew[num].date = date;
            listnew[num].day = day;
          }
          
          
          // list[i].date = date
          // list[i].day = day
        }
        console.log(listnew,"sdafsd")
        // that.setData({
        //   note_list: list
        // })
        
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        
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