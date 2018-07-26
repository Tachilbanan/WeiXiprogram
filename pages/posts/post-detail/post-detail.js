var postsData = require('../../../data/posts-data.js')

Page({
  data:{

  },

  onLoad:function(option){
    var postId = option.id;
    // console.log(postId);
    var postData = postsData.postList[postId];
    // console.log(postData);
    // console.log(postsData);
    this.setData(postData);
  }
})