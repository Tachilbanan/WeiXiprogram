var util = require('../../utils/util.js');
var app = getApp();

Page({
  // RESTFul API JSON
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  onLoad: function(event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    //请求数据
    this.getMovieListDate(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListDate(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListDate(top250Url, "top250", "TOP250");
  },

  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  },

  getMovieListDate: function (url, settedKey, categoryTitle) {
    var that = this;
    //获取豆瓣数据
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function() {
        console.log("failed")
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    //定义一个空数组存放数据
    var movies = [];
    //获取到的数据填充
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  }


})