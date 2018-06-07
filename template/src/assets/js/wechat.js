import Vue from 'vue'
import Ajax from '@/assets/js/ajax'
var wx = require('weixin-js-sdk');
// Vue.wechat 可以直接访问 wx 对象。
// import { WechatPlugin } from 'vux'
// Vue.use(WechatPlugin)
// var wx = Vue.wechat


var Wechat={
  wxData:{},
  isInitialization: false,
  defaultShare : {
    title   : "zeal的分享",
    imgUrl  : "",
    desc	: "zeal分享描述",
    link : ""
  },
  shareInfo :{},
  //微信配置
  weConfig:function(callBackFn){
    var url = (window.location.href).split('#')[0];
    Ajax.post("/wechat/portal/share",
    {url:url}).then(function(response){
         Wechat.GetInit(response,callBackFn);
         Wechat.wxData = response.data
    });
  },

  GetInit:function(data,callBackFn){
    wx.config({
      debug : false,//这里是开启测试，如果设置为true，则打开每个步骤，都会有提示，是否成功或者失败
      appId : data.data.appId,
      timestamp : data.data.timestamp,
      nonceStr : data.data.nonceStr,
      signature : data.data.signature,
      jsApiList : [           // 所有要调用的 API 都要加到这个列表中
        'chooseImage',
        'hideMenuItems',
        'hideOptionMenu',
        'showOptionMenu',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'closeWindow',
        'previewImage',
        'uploadImage',
        'chooseWXPay',
        'downloadImage']
    });
    wx.ready(function(){
      // alert("hide")
      // 如果有回调函数就执行回调方法
      if(typeof(callBackFn) == "function"){
        callBackFn();
      }

      // alert("hide")
    });
    wx.error(function (res) {
       alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
    });
  },

  setShareInfo:function(shareInfo){
    var info = {  //例如分享到朋友圈的API
      title: shareInfo.title, // 分享标题
      link: shareInfo.link, // 分享链接
      imgUrl: shareInfo.imgUrl, // 分享图标
      desc: shareInfo.desc, // 描述

      //
      success: function () {
//console('执行分享后执行的回调函数success:');
        // 用户确认分享后执行的回调函数
        if(shareInfo.succCallbackFn){
           shareInfo.succCallbackFn();
        }
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
    }
    // 分享到朋友圈的API
    console.log(info)
    wx.onMenuShareTimeline(info);

    //发送给好友
    wx.onMenuShareAppMessage(info);

    //分享到QQ
    wx.onMenuShareQQ(info);

  },
  setShareTimeline:function (shareInfo) {
    var info = {  //例如分享到朋友圈的API
      title: shareInfo.title, // 分享标题
      link: shareInfo.link, // 分享链接
      imgUrl: shareInfo.imgUrl, // 分享图标
      desc: shareInfo.desc // 描述
    }
    wx.onMenuShareTimeline(info);
  },

  // 隐藏右上角菜单
  hideOptionMenu:function(){
    wx.hideOptionMenu();
  },
  // 显示右上角菜单
  showOptionMenu:function(){
    wx.showOptionMenu();
  },
  pay:function (data,callBackFn) {
    alert(1)
    wx.chooseWXPay({
      timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
      package: data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: data.paySign, // 支付签名
      success: function(res) {
        // 支付成功后的回调函数
        alert("支付成功");
        // if(typeof(callBackFn) === "function"){
        //   callBackFn();
        // }
      },
      fail : function(res) {
        console.log(res);
        alert(res);
      }
    });
  }
}

 export default Wechat;
