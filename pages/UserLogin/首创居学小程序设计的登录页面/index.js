// pages/login/login.js
Page({
  data: {
    title: '让比赛咨询更加方便🎉',
    second: 60,
    userAccound: '',
    userPassword: '',
    userInfo: "",
    // 有关登录的小标题
    showDialog:false,
    showTitile:"",
    showBody:"",
    titleColor:"#45526b;",
    //展示用户注册表
    showRegister:false,
    //注册表的字段设置
    name: '',     // 姓名对应的数据字段
    account: '',   // 账户对应的数据字段
    password:'',
    confirm_password:'',
    email:'',
    phoneNumber:'',
    major_name:'',
    college_name:'',
    class_name:'',

  },
  
  login: function() {
    var that = this;
    var userName = that.data.userAccound;
    var userPassword = that.data.userPassword;

    // 在增加一个如果不输入直接登录会进行提醒的
   
    wx.request({
      url: 'http://127.0.0.1:8000/client/userlogin/',
      method: 'POST',
      data: {
        username: userName,
        password: userPassword
      },
      header: {
        'Content-Type': 'application/json' // 修改为发送 JSON 数据
      },
      success: function(res) {
        console.log("查看返回的结果", res.data);
        if(res.data.code==200){
          wx.redirectTo({
            url: '/pages/homePage/index'
          });
          
        }else{
          that.setData({
            showDialog:true,
            showTitile:"用户登录失败！",
            showBody:"用户名或密码错误,请重新登录"
          })
        }
      },
      fail: function(error) {
        console.log("请求失败:", error);
      }
    });
  },
  registerButton:function(e){

    var that = this;
 


    that.setData({
      showRegister:true
    })
  },
  // 获取用户注册提交的信息
  registerForm:function(e){
    var that = this;
    var Name = that.data.name;     // 姓名对应的数据字段
    var Account = that.data.account;   // 账户对应的数据字段
    var Password = that.data.password;
    var Email = that.data.email; 
    var Phone = that.data.phoneNumber;
    var ConfirmPassword = that.data.confirm_password;
    var Major = that.data.major_name;
    var College = that.data.college_name;
    var Class = that.data.class_name;

    if (!Name || !Account || !Password || !Email || !Phone || !ConfirmPassword || !Major || !College || !Class) {
      wx.showModal({
        title: '注册异常提醒',
        content: '请填写完整的注册信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }
    
    wx.request({
      url: 'http://127.0.0.1:8000/client/userRegister/',
      method: 'POST',
      data: {
        name:Name,
        username:Account,
        password:Password,
        confirm_password:ConfirmPassword,
        phoneNumber:Phone,
        email:Email,
        major_name:Major,
        college_name:College,
        class_name:Class
      },
      header: {
        'Content-Type': 'application/json' // 修改为发送 JSON 数据
      },
      success: function(res) {
        if(res.data.code==200){
          that.setData({
            showDialog:true,
            showTitile:"注册成功",
            showBody:"可使用账号密码进行登录",
            showRegister:false
          })
        }else{
          wx.showModal({
            title: '注册异常提醒',
            content: '请检查两次密码是否一致',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function(error) {
        console.log("请求失败:", error);
      }
    });


    
  },


  submitForm: function(e) {
    var formData = e.detail.value; // 获取表单数据
    // 发送网络请求或进行其他处理
    console.log(formData);
  },
  
  
 //获取注册提交的信息
 inputRegister:function(e){
  var that = this;
  var inputValue = e.detail.value;             // 获取输入的值
  var inputField = e.target.dataset.inputType; // 获取自定义属性值
  this.setData({
    [inputField]: inputValue  // 将输入的值赋给对应的数据字段
  });
  

 },


  //输入的账号和密码:
  inputAccount:function(e){
    var that = this;
    this.setData({
      userAccound:e.detail.value
    })
  },
  //获取输入的密码
  inputPassword:function(e){
    this.setData({
      userPassword:e.detail.value
    });
  }
});
