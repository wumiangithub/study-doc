# 小程序登录和支付

## 支付

## 后端下单

[官方文档](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/pages/index.shtml)

## 统一下单接口

- 第一步：后端调用微信统一下单接口（https://api.mch.weixin.qq.com/pay/unifiedorder），生成预付单号 prepay_id 等信息返回给前端
- 第二步：前端拿着后端给的加密信息和 prepay_id 拉起微信支付
- 第三步：【服务端】接收支付结果通知

### 客户端 小程序、公众号 拉起微信需要的参数

```
appId       注意这里是驼峰，和APP的不一样
timeStamp   时间戳
nonceStr    随机字符串
package     数据包    prepay_id=wx2017033010242291fcfe0db70013231072
signType    签名方式
paySign     签名
```

### requestPayment

**小程序使用 wx.requestPayment 方法拉起微信支付**

### 客户端 app 拉起微信需要的参数

```
appid
partnerid   商户号
prepayid    微信返回的支付交易会话ID
package     扩展字段    暂填写固定值Sign=WXPay
noncestr    随机字符串
timestamp   时间戳
sign        签名
```

**注意：其他的 jsapi 支付等只支持 直连商户**

[统一下单接口: 官方文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1)

## 登录
