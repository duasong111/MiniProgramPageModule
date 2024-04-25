// pages/Test3/Test3.js
let inputWord = "word"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        images: {},
        query: {},
        imagsult: {},
        inputText: "",
        showExplain:false
    },
    // 对图片的格式进行调整
    imageLoad: function (e) {
        var $width = e.detail.width,    //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height;    //图片的真实宽高比例
        var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
            viewHeight = 718 / ratio;    //计算的高度值
        var image = this.data.images;
        //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
        image[e.target.dataset.index] = {
            width: viewWidth,
            height: viewHeight,
        }
        this.setData({
            images: image
        })
    },
    onLoad(options) {
        this.setData({
            //   将option的值赋值给query,这个可以后来使用
            query: options
        })
        this.getimages();
        this.every_word();
    },
    // 每日一词的js开发
    every_word() {
        var that = this;
        wx.request({
            url: 'https://apis.tianapi.com/everyday/index',
            method: 'POST',
            data: {
                key: 'ca7ff62fee8f7e86102e33e21ce89afb'
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.data.code == 200) {
                    console.log(res.data)
                    that.setData({
                        ReturnSentence: res.data.result, 
                    })
                } else {
                    ReturnSentence: "今日刷新已上限"
                }
            },
            fail: function (err) {
                console.log(err)
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    },
    // Bing接口的开发
    getimages() {
        wx.request({
            url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log(res.data)
                this.setData({
                    imagsult: res.data.images //后边是数组名称
                })
            },
        })
    },
    getInputValue(e) {
        // 现将传输过来的值进行保存在这里,然后去进行发送请求
       
       
       
            this.setData({
                showExplain:false
            })
       
    },


    search() {
        var that = this;
        var inputText = this.data.inputText
        wx.request({
            url: 'http://127.0.0.1:8000/Part1/search/query',
            method: 'GET',
            data: { 
                data: inputText
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log("显示返回结果",res)
                if (res.data.code == 200) {
                    console.log("如果是一般的结果res.data的值是:",res.data.data)
                  
                    that.setData({
                        backResultWord: res.data.data, //返回内容更新到视图层{{tianapi_data}}
                        showExplain:true
                    })
                }
            },
            fail: function (err) {
                console.log(err);
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
