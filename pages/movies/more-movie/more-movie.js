var util = require('../../../utils/util.js');
var app = getApp();
// pages/movies/more-movie/more-movie.js
Page({
  data: {
    movies:{},
    navigateTitle: "",
  },
  onLoad: function(options) {
    var category = options.category;
    this.data.navigateTitle = category;
    // console.log(category);
    var dataUrl = ""
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "TOP250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    util.http(dataUrl, this.callBack)
  },

  processDoubanData: function (moviesDouban) {
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
    this.setData({
      movies: movies
    });
  }
},

onReady: function(event) {
  wx.setNavigationBarTitle({
    title: this.data.navigateTitle,
    success: function(res) {

    }
  })
}
})