// pages/post/post_details.js

var postData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:{},
    collected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    this.data.id = postid;
    var postdata = postData.postList[postid];

    this.setData({
      post_Data: postdata
    });


    // 获取localstorage文章是否收藏的数据
    let postCollected = wx.getStorageSync('collectionData')
    // 如果之前没有进入这个文章详情页面，则让postCollected为空对象
    if (!postCollected) {
      postCollected = {}
    }
    // 如果以前收藏过文章，则按钮变成收藏的样式，
    let collected = postCollected[postid]
    this.setData({
      collected
    })
    wx.setStorageSync('collectionData', postCollected)
  },


  onCollectionTap: function (event) {
    //获取相关数据，postId为当前的id值
    let postId = this.data.id
    let postCollected = wx.getStorageSync('collectionData')
    //判断是否保存，如果没保存，点击按钮，保存，显示按钮保存样式
  var Collected=  postCollected[postId] = postCollected[postId] ? false : true
    let collected = postCollected[postId]
    this.ShowToast(postCollected, Collected);
    // //交互反馈
    // wx.showToast({
    //   title: postCollected[postId] ? '收藏成功' :'取消成功',
    //   icon: 'success',
    //   image: '',
    //   duration: 1500,
    //   mask: true,
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })


 

    // //​显示操作菜单
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   itemColor:"#3CC51F",
    //   success: function (res) {
    //     console.log(res.tapIndex)//从0开始 
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },

  ShowToast: function (postCollected, Collected) {
    var that = this;
    //​显示模态弹窗 需要用户操作
    wx.showModal({
      title: "提示",
      content: Collected?"是否收藏该文章" :"收藏该文章",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: "#3CC51F",
      success: function(res) {
        //逻辑上将提示框与文章绑定在一起
        if(res.confirm){
          that.setData({
            collected: Collected
          })
          wx.setStorageSync('collectionData', postCollected)
        }
        }
    })
  }
})