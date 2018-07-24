Page({
  onTap:function(event){
    // wx.navigateTo({
    //   url: '../posts/post',
    // })

    wx.redirectTo({
      url: '../posts/post',
    })
    
    // wx.navigateTo({
    //   url: 'String',
    //   success:function(res){
    //     //success
    //   },
    //   fail:function(){
    //     //fail
    //   },
    //   complete:function(){
    //     //complete
    //   }
    // })
  },

  onUnload:function(){
    console.log("onUnload");
  },

  onHide:function(){
    console.log("welcome page is hide");
  }
})