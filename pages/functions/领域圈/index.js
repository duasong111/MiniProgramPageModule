Page({
  data: {
      navLeftItems:"",
      navRightItems: "",
      curNav: 1,
      curIndex: 0,
      //展示详细信息
      showPoP:false,
      selectedItem: null,
  },
  onLoad: function() {
      // 加载的使用进行网络访问，把需要的数据设置到data数据对象
			this.getAcquiringProfessionalFields()
  },
//   获取专业领域以及比赛项目
getAcquiringProfessionalFields:function(){
    var that = this        
    wx.request({
        url: 'http://127.0.0.1:8000/inform/InformProject/',
        method: 'GET',
        data: {},
        header: {
            'Accept': 'application/json'
        },
        success: function(res) {
            that.setData({
                navLeftItems: res.data.data.navLeftItems,
                navRightItems: res.data.data.navRightItems
            })
        }
    })
},

  //事件处理函数--就是点击之后相对应的去进行展示
  switchRightTab: function(e) {
      let id = e.target.dataset.id,  
      index = parseInt(e.target.dataset.leftIndex);
      this.setData({
          curNav: id,
          curIndex: index
      })
  },
  //对项目展开更加详细的展示
  getDetail(event) {
    const { rightIndex } = event.currentTarget.dataset;
    const selectedItem = this.data.navRightItems[this.data.curIndex][rightIndex];
    this.setData({
      selectedItem,
      showPoP: true,
    });
  },


})
