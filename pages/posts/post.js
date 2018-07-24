Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var posts_content=[
      {
        date: 'July 23 2018',
        title: '论御姐的霸道',
        post_img: '/images/post/Yu_01.png',
        author_img: '/images/post/heard_01.png',
        content: '御姐是来自日本的词语“御姊”，本义是对姐姐的敬称，具备一些个性的高年龄层少女或青年女性（通常16~34岁），性格上冷静，淡定，认知上对各种事物的理解是多面复杂的，性格坚强，心智成熟，拥有高贵的气质等。',
        view_num: '92',
        collect_num: '65',
      },
      {
        date: 'July 25 2018',
        title: '萝莉的养成',
        post_img: '/images/post/loli_01.png',
        author_img: '/images/post/heard_01.png',
        content: '萝莉，即洛丽塔的缩写。出自台湾作家赵尔心翻译的俄裔美国作家的小说《洛丽塔》，或指小说中的女主角12岁的洛丽塔，后在日本引申发展成一种次文化，用来表示可爱、萌萌的女孩，或用在与其相关的事物，例如洛丽塔时装。',
        view_num: '100',
        collect_num: '82',
      },
      {
        date: 'July 29 2018',
        title: '胸不平何以平天下',
        post_img: '/images/post/ping_01.png',
        author_img: '/images/post/heard_01.png',
        content: '平胸，又称贫乳、微乳、微波，是指平坦的乳房，一般指尺寸在A罩杯或以下的女性乳房。成年女性若拥有平胸，除乳房先天发育不良的因素外，有些是因为穿着不适合的胸罩，令乳房脂肪不能集中导致。',
        view_num: '65',
        collect_num: '53',
      }
    ]
    this.setData({
      posts_key:posts_content
    });
  }
})