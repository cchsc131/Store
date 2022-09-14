/* eslint-disable node/handle-callback-err */
/* eslint-disable space-infix-ops */
const express = require('express')
const router = express.Router()
// eslint-disable-next-line no-unused-vars
// 连接数据库
// eslint-disable-next-line no-var
var QcloudSms = require('qcloudsms_js')
const jwt = require('jsonwebtoken')

const connection = require('../db/sql.js')
// eslint-disable-next-line no-unused-vars, no-var
const user = require('../db/userSql.js')
const { log } = require('grunt')
//引入支付宝配置文件
const alipaySdk = require('../db/alipay.js');
const AlipayFormData = require('alipay-sdk/lib/form').default;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

//发起支付
router.post('/api/payment',function(req,res,next){
  //订单号
  let orderId = req.body.orderId;
  //商品总价
  let price = req.body.price;
  //购买商品的名称
  let name = req.body.name;
  //开始对接支付宝API
  const formData = new AlipayFormData();
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  //支付时信息
  formData.addField('bizContent', {
    outTradeNo: orderId,//订单号
    productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
    totalAmount: price,//价格
    subject: name,//商品名称
  });
  //支付成功或者失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/payment');
  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  //对接支付宝成功，支付宝方返回的数据
  result.then(resp=>{
      res.send({
          data:{
              code:200,
              success:true,
              msg:'支付中',
              paymentUrl : resp
          }
      })
  })
})
// 查询订单
router.post('/api/selectOrder', function (req, res, next){
  let orderId=req.body.orderId  
  connection.query(`select * from store_order where order_id ='${orderId}'`,(e,r)=>{
    res.send({
      data: {
        code: 200,
        success: true,
        data:r
      }
    })
  })
})
//修改订单状态
router.post('/api/submitOrder', function (req, res, next){
  let orderId =req.body.orderId
  let selectGoodsId=req.body.selectGoodsId
  // console.log(orderId,selectGoodsId);
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id
    connection.query(`select * from store_order where uId=${uId} and order_id=${orderId}`,(err,result)=>{
      let id=result[0].id
      connection.query(`update store_order set goods_status = replace(goods_status,'1','2') where id = ${id}`,(e,r)=>{
        selectGoodsId.forEach(v=>{
          connection.query(`delete from goods_cart where id = ${v}`,()=>{
            
          })
        })
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      })
    })
  })
})

//生成订单
router.post('/api/addOrder', function (req, res, next){
  let newList=req.body.newList
  console.log(newList);
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  function setTimeDate(s) {
    return s<10? '0'+s:s
  }
  function randomNumber(){
    const now  =new Date()
    let month  =now.getMonth()+1
    let day    =now.getDate()
    let hours  =now.getHours()
    let minute =now.getMinutes()
    let seconds=now.getSeconds()
    month   =setTimeDate(month  )
    day     =setTimeDate(day    )
    hours   =setTimeDate(hours  )
    minute  =setTimeDate(minute )
    seconds =setTimeDate(seconds)
    let orderCode=now.getFullYear().toString()+month.toString()  
    +day 
    +hours 
    +minute
    +seconds
    +(Math.round(Math.random()*1000000)).toString()

    return orderCode
  }
  let goodsName=[]
  let goodsNum=0
  let goodsPrice=0
  let orderId = randomNumber();

  // 不需要this.newList
  newList.forEach(v=>{
    goodsName.push(v.goods_name)
    goodsNum+=parseInt(v.goods_num)
    goodsPrice+=v.goods_num*v.goods_price
  })
  // console.log(randomNumber());
  
  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id;
    connection.query(`insert into store_order (order_id,goods_name,goods_num,goods_price,goods_status,uId) values
     ('${orderId}','${goodsName}','${goodsNum}','${goodsPrice}','1','${uId}')`,function(err,result){
      connection.query(`select * from store_order where uId=${uId} and order_id='${orderId}'`,(e,r)=>{
        res.send({
          data: {
            code: 200,
            success: true,
            data:r
          }
        })
      })
      
    })
  })
})

//查询地址
router.post('/api/selectAddress', function (req, res, next){
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id;
    connection.query(`select * from address where uId = ${uId}`,function(e,result){
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '查询成功',
          data: result
        }
      })
    })
  })
})
//删除地址
router.post('/api/deleteAddress',(req,res,next)=>{
  let id=req.body.id
  console.log(id)
  connection.query(`delete from address where id=${id}`,(error,result)=>{
    res.send({
      data: {
        code: 200,
        success: true,
        msg:'删除成功'
      }
    })
  })
})
//修改地址
router.post('/api/updateAddress',function(req,res,next){
  //token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //拿到前端给后端传入的数据
  let body = req.body;
  let [id,name,tel,province,city,county,addressDetail,isDefault,areaCode] = [
      body.id,
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode
  ];
  //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`,function(error,results){
      //用户id
      let uId = results[0].id;
      // 此时的isDefault可能为0,1
      connection.query(`select * from address where uId=${uId} and isDefault=${isDefault}`,(err,result)=>{
        if(result.length>0){
        // 有至少两个收货地址

          let addressId=result[0].id
          connection.query(`update address set isDefault = replace(isDefault,'1','0') where id = ${addressId}`,(e,r)=>{
          let updateSql=`update address set uId=?,name=?,tel=?,province=?,city=?,county=?,addressDetail=?,isDefault=?,areaCode=? where id=${id}`
          connection.query(updateSql,[uId,name,tel,province,city,county,addressDetail,isDefault,areaCode],(errors,datas)=>{
            res.send({
              data:{
                  code:200,
                  success:true,
                  msg:'修改成功'
              }
            })
          })
          })
        }else{
          let updateSql=`update address set uId=?,name=?,tel=?,province=?,city=?,county=?,addressDetail=?,isDefault=?,areaCode=? where id=${id}`
          connection.query(updateSql,[uId,name,tel,province,city,county,addressDetail,isDefault,areaCode],(errors,datas)=>{
            res.send({
              data:{
                  code:200,
                  success:true,
                  msg:'修改成功'
              }
            })
          })
        }
        
      })
      
  })
})
//添加地址
router.post('/api/addAddress',function(req,res,next){
  //token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //拿到前端给后端传入的数据
  let body = req.body;
  let [name,tel,province,city,county,addressDetail,isDefault,areaCode] = [
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode
  ];
    //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`,function(error,results){
      //用户id
      let uId = results[0].id;
      //增加一条收货地址
      
      if(  isDefault != 1 ){
          connection.query(`insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,function(err,result){
              res.send({
                  data:{
                      code:200,
                      success:true,
                      msg:'收货地址添加成功'
                  }
              })
          })
      }else{
          
          connection.query(`select * from address where uId = ${uId} and isDefault = ${isDefault}`,function(err,result){
            if(result.length>0){
              let addressId = result[0].id;
              connection.query(`update address set isDefault = replace(isDefault,'1','0') where id = ${addressId}`,function(){
                  connection.query(`insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,function(e,r){
                      res.send({
                          data:{
                              code:200,
                              success:true,
                              msg:'收货地址添加成功'
                          }
                      })
                  })
              })
            }else{
              connection.query(`insert into address (uId,name,tel,province,city,county,addressDetail,isDefault,areaCode) values (${uId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`,function(e,r){
                res.send({
                    data:{
                        code:200,
                        success:true,
                        msg:'收货地址添加成功'
                    }
                })
            })
            }
          })
        
          
      }
  })
})
//修改购物车数据
router.post('/api/changeNum', function (req, res, next){
  const changeNum=req.body.num
  const id=req.body.id  
  // 先查询原来商品的数量
  connection.query(`select * from goods_cart where id=${id}`,(error,results)=>{
    // 原来的数量
    const num=results[0].goods_num
    connection.query(`update goods_cart set goods_num = replace(goods_num,${num},${changeNum}) where id=${id}`,(e,r)=>{

    res.send({
      data: {
        code: 200,
        success: true,
        
      }
    })
    })
  })
})
//删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let arrId = req.body.arrId
  for(let i=0;i<arrId.length;i++){
    connection.query(`delete from goods_cart where id = ${arrId[i]}`, function (error, results) {
      res.send({
        data: {
          code: 200,
          success: true,
          msg:'删除成功'
        }
      })
    })
  }
  
})

//查询购物车数据
router.post('/api/selectCart', function (req, res, next) {
  //token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);
  //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    //用户id
    let uId = results[0].id;
    //查询购物车
    connection.query(`select * from goods_cart where uId = ${uId}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })
})
//添加购物车数据
router.post("/api/addCart", function (req, res, next) {
  //后端接收前端的参数
  let goodsId = req.body.goodsId
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //如果执行，就证明token过期了
  // if (getTimeToken(tokenObj.exp)) {
  //   res.send({
  //     data: {
  //       code: 1000,
  //     },
  //   })
  // }
  //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`,function (error, results) {
      console.log(results.length);
          //用户id
      let uId = results[0].id
      //查询商品
      connection.query(
        `select * from goods_list where id=${goodsId}`,
        function (err, result) {
          let goodsName = result[0].name
          let goodsPrice = result[0].price
          let goodsImgUrl = result[0].imgUrl
          //查询当前用户在之前是否添加过本商品
          connection.query(
            `select * from goods_cart where uId=${uId} and goods_id=${goodsId}`,
            function (e, r) {
              //用户之前是添加过商品到购物车
              if (r.length > 0) {
                let num = r[0].goods_num
                connection.query(
                  `update goods_cart set goods_num = replace(goods_num,${num},${
                    parseInt(num) + 1
                  }) where id = ${r[0].id}`,
                  function (e, datas) {
                    res.send({
                      data: {
                        code: 200,
                        success: true,
                        msg: "添加成功",
                      },
                    })
                  }
                )
              } else {
                //没有
                connection.query(
                  `insert into goods_cart (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values ("${uId}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`,
                  function () {
                    res.send({
                      data: {
                        code: 200,
                        success: true,
                        msg: "添加成功",
                      },
                    })
                  }
                )
              }
            }
          )
        }
      )
      
      
      
    }
  )
})
router.post('/api/register', function (req, res, next) {
  const params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }
  connection.query(user.queryUserTel(params), function (error, results) {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登陆成功',
          data: results[0]

        }
      })
    } else {
      // 不存在，则新增
      connection.query(user.inserData(params), function (err, result) {
        // 再查询，返回给前端
        connection.query(user.queryUserTel(params), function (e, r) {
          console.log(e)
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '注册并登陆成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

// 新增用户
router.post('/api/addUser', function (req, res, next) {
  const params = {
    userTel: req.body.phone
  }
  connection.query(user.queryUserTel(params), function (error, results) {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登陆成功',
          data: results[0]

        }
      })
    } else {
      // 不存在，则新增
      connection.query(user.inserData(params), function (err, result) {
        // 再查询，返回给前端
        connection.query(user.queryUserTel(params), function (e, r) {
          console.log(e)
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登陆并注册成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

// 获取验证码
router.post('/api/code', function (req, res, next) {
  const tel = req.body.phone
  // 短信应用SDK AppID
  const appid = 1400187558 // SDK AppID是1400开头

  // 短信应用SDK AppKey
  const appkey = 'dc9dc3391896235ddc2325685047edc7'

  // 需要发送短信的手机号码
  const phoneNumbers = [tel]

  // 短信模板ID，需要在短信应用中申请
  const templateId = 285590 // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  const smsSign = '验证码' // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  // eslint-disable-next-line no-undef
  const qcloudsms = QcloudSms(appid, appkey)

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log('err: ', err)
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

  const ssender = qcloudsms.SmsSingleSender()
  // 这个变量：params 就是往手机上，发送的短信
  const params = [Math.floor(Math.random() * (9999 - 1000)) + 1000]
  ssender.sendWithParam(
    86,
    phoneNumbers[0],
    templateId,
    params,
    smsSign,
    '',
    '',
    callback
  ) // 签名参数不能为空串
})

// 登录
router.post('/api/login', function (req, res, next) {
  // eslint-disable-next-line no-unused-vars
  // 前端传过来的数据
  // eslint-disable-next-line prefer-const
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  }
  // eslint-disable-next-line node/handle-callback-err
  // 查询手机号是否存在
  connection.query(user.queryUserTel(params), function (error, results) {
    if (results.length > 0) {
      connection.query(user.queryUserPwd(params), function (err, result) {
        if (result.length > 0) {
          res.send({
            code: 400,
            data: {
              success: true,
              msg: '登录成功',
              data: result[0]
            }
          })
        } else {
          res.send({
            code: 302,
            data: {
              success: false,
              msg: '密码不正确'
            }
          })
        }
      })
    } else {
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '手机号,不存在'
        }
      })
    }
  })
})

// 根据ID查询
router.get('/api/goods/id', function (req, res, next) {
  // eslint-disable-next-line no-unused-vars, padded-blocks, prefer-const
  let id = req.query.id
  connection.query('select * from goods_list where id=' + id + '', function (error, results) {
    if (error) throw error
    res.send({
      code: 0,
      data: results[0]
    })
  })
})

// 分类页面接口
router.get('/api/goods/list', function (req, res, next) {
  res.send({
    code: 0,
    data: [{
        // 一级
        id: 0,
        name: '推荐',
        data: [{
          // 二级
          id: 0,
          name: '推荐',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 6,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      },
      {
        // 一级
        id: 1,
        name: '华为',
        data: [{
          // 二级
          id: 0,
          name: '华为',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      },
      {
        // 一级
        id: 2,
        name: '苹果',
        data: [{
          // 二级
          id: 0,
          name: '苹果',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      },
      {
        // 一级
        id: 3,
        name: '小米',
        data: [{
          // 二级
          id: 0,
          name: '小米',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      },
      {
        // 一级
        id: 4,
        name: 'OPPO',
        data: [{
          // 二级
          id: 0,
          name: 'OPPO',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      },
      {
        // 一级
        id: 5,
        name: 'vivo',
        data: [{
          // 二级
          id: 0,
          name: 'vivo',
          list: [
            // 三级
            {
              id: 0,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 1,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 3,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 4,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            },
            {
              id: 5,
              name: '手机',
              imgUrl: './images/list1.jpeg'
            }
          ]
        }]
      }
    ]
  })
})

// 查询数据接口
router.get('/api/goods/shopList', function (req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const [searchName,orderName] = Object.keys(req.query)
  const [name,order]=Object.values(req.query)
  console.log(searchName,orderName);

  console.log(name,order);
  // eslint-disable-next-line node/handle-callback-err
  connection.query('select * from goods_list where name like "%'+name+'%" order by '+orderName+' '+order+''
  , function (error, results) {
    res.send({
      code: 0,
      data: results
    })
  })
})

// 首页推荐数据
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [{
          value: '1',
          title: '首页'
        },
        {
          value: '2',
          title: '华为'
        },
        {
          value: '3',
          title: '苹果'
        }
        // ,

        // {
        //   value: '6',
        //   title: '关注',
        //   badge: 22
        // }

      ],
      data: [{
          id: 0,
          type: 'swiperList',
          data: [{
              id: 1,
              imgUrl: './images/swiper1.jpeg'
            },
            {
              id: 2,
              imgUrl: './images/swiper2.jpeg'
            },
            {
              id: 3,
              imgUrl: './images/swiper3.jpeg'
            }
          ]
        },
        //
        {
          id: 1,
          type: 'iconsList',
          data: [

            {
              id: 1,
              title: 1,
              imgUrl: './images/icons3.png'
            },

            {
              id: 2,
              title: 2,
              imgUrl: './images/icons4.png'
            },

            {
              id: 3,
              title: 3,
              imgUrl: './images/icons5.png'
            }
          ]
        },
        //
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 1,
              title: '华为 P50',
              content: '新款智能手机鸿蒙手机',
              price: '4488',
              imgUrl: './images/recommend.jpeg'
            },
            {
              id: 2,
              title: 'iPhone 13',
              content: '搭载全新A15仿生芯片',
              price: '5999',
              imgUrl: './images/recommend2.jpeg'
            },
            
          ]
        },
        {
          id: 3,
          type: 'likeList',
          data: [{
              id: 1,
              title: '华为 nova 10手机',
              content: '华为 nova 10手机',
              price: '2699',
              imgUrl: './images/goods1.jpg'
            },
            {
              id: 2,
              title: '华为 nova 9手机',
              content: '华为 nova 9手机',
              price: '2599',
              imgUrl: './images/goods2.jpg'
            },
            {
              id: 3,
              title: 'iPhone 13 苹果手机',
              content: 'iPhone 13 苹果手机',
              price: '5999',
              imgUrl: './images/goods3.jpg'
            },
            {
              id: 4,
              title: 'iPhone 12 苹果手机',
              content: 'iPhone 12 苹果手机',
              price: '5199',
              imgUrl: './images/goods4.jpg'
            },
            {
              id: 5,
             title: 'vivo X80新品旗舰手机',
              content: 'vivo X80新品旗舰手机',
              price: '3699',
              imgUrl: './images/goods5.jpg'
            },
            {
              id: 6,
              title: '小米 12S Ultra手机',
              content: '小米 12S Ultra手机',
              price: '5999',
              imgUrl: './images/goods6.jpg'
            },
            {
              id: 7,
              title: '华为 P50手机',
              content: '华为 P50手机',
              price: '4488',
              imgUrl: './images/goods7.jpg'
            }
          ]
        }
      ]
    }
  })
})

router.get('/api/index_list/2/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [{
        id: 1,
        type: 'adList',
        data: [{
            id: 1,
            imgUrl: './images/dhp.jpeg'
          },
          {
            id: 2,
            imgUrl: './images/dhp.jpeg'
          }

        ]
      },
      {
        id: 2,
        type: 'likeList',
        data: [{
            id: 1,
            title: '华为 nova 10手机',
              content: '华为 nova 10手机',
              price: '2699',
            imgUrl: './images/goods1.jpg'
          },
          {
            id: 2,
            title: '华为 nova 9手机',
              content: '华为 nova 9手机',
              price: '2599',
            imgUrl: './images/goods2.jpg'
          },
          {
            id: 3,
            title: '华为 nova 10手机',
              content: '华为 nova 10手机',
              price: '2699',
            imgUrl: './images/goods1.jpg'
          },
          {
            id: 4,
            title: '华为 nova 9手机',
              content: '华为 nova 9手机',
              price: '2599',
            imgUrl: './images/goods2.jpg'
          }
        ]
      }
    ]
  })
})

router.get('/api/index_list/3/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [{
        id: 1,
        type: 'adList',
        data: [{
            id: 1,
            imgUrl: './images/tgy.jpeg'
          },
          {
            id: 2,
            imgUrl: './images/tgy.jpeg'
          }

        ]
      },
      {
        id: 2,
        type: 'likeList',
        data: [{
            id: 1,
            title: 'iPhone 13 苹果手机',
              content: 'iPhone 13 苹果手机',
              price: '5999',
              imgUrl: './images/goods3.jpg'
          },
          {
            id: 2,
            title: 'iPhone 13 苹果手机',
              content: 'iPhone 13 苹果手机',
              price: '5999',
              imgUrl: './images/goods3.jpg'
          },
          {
            id: 3,
            title: 'iPhone 13 苹果手机',
              content: 'iPhone 13 苹果手机',
              price: '5999',
              imgUrl: './images/goods3.jpg'
          },
          {
            id: 4,
            title: 'iPhone 13 苹果手机',
              content: 'iPhone 13 苹果手机',
              price: '5999',
              imgUrl: './images/goods3.jpg'
          }
        ]
      }
    ]
  })
})

module.exports = router