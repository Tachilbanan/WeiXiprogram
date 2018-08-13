var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false,
  },

  onLoad: function(option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData(postData);


    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);

    };
    //用全局变量控制音乐状态
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true,
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor: function() {
    //监听播放，使页面上的播放与总控开关一致
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });

    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  //收藏按钮
  onColletionTap: function(event) {
    this.getPostCollectedSyc();
    // this.getPostCollectedAsy();
  },

  //异步调用
  getPostCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })
  },

  //同步调用
  getPostCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  //弹出浮动的确认提示框，手动取消
  showModal: function(postsCollected, postCollected) {
    //此处的this要在success中被调用，但this只是属于page的this，需要重新声明
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章?',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          //更新文章是否被收藏
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  //弹出提示框自动消失
  showToast: function(postsCollected, postCollected) {
    //更新文章是否被收藏
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },


  //分享按钮功能（目前暂不能实现）
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享给QQ好友",
      "分享到QQ空间",
      "分享到微博",
    ];
    // wx.showActionSheet({
    //   itemList: [
    //     "分享给微信好友",
    //     "分享到朋友圈",
    //     "分享给QQ好友",
    //     "分享到QQ空间",
    //     "分享到微博",
    //   ],

    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 用户是否点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能",
        })
      }
    })
  },

  //音乐播放按钮功能
  onMusicTap: function(event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId].music;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.dataUrl,
        title: postData.title,
        coverImgUrl: postData.coverImgUrl,
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})