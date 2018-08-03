var postsData = require('../../data/posts-data.js')

Page({
  data:{

  },
  onLoad: function (options) {
    this.setData({
      posts_key:postsData.postList
    });
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  // onSwiperItemTap:function(event){
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId
  //   })
  // },

  onSwiperTap:function(event){
    //target和currentTarget区别
    //target指的是当前点击的组件，currentTarget指的是事件捕捉的组件
    //target这里指的时image，currentTarget这指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})