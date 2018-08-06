Page({
  // RESTFul API JSON

  onLoad:function(event){
    //获取豆瓣数据
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250 ',
      header: {
        "Content-Type" : ""
      },
      success: function(res){
        console.log(res)
      },
      fail: function(){
        console.log("failed")
      },
    })
  }
})