<template>
  <div class='order container'>
    <header>
      <i class='iconfont icon-fanhui' @click='$router.back()'></i>
      <span>提交订单</span>
      <i class='iconfont icon-kefu'></i>
    </header>
    <section ref="wrapper">
      <div>
        <div class='path'>
        <h3 class='path-title'>收货信息</h3>
        <div class='path-content' @click='goPath'>
          <div>
            <div>
            <span>{{path.name}}</span>
            <span>{{path.tel}}</span>
          </div>
          <div>
            <span>{{path.province}}</span>
            <span>{{path.city}}</span>
            <span>{{path.county}}</span>
            <span>{{path.addressDetail}}</span>

          </div>
          </div>
          <div class="tb"><van-icon name="arrow" /></div>
        </div>

      </div>
      <div class='payment'>
        <div class='payment-title'>支付方式：</div>
        <van-radio-group v-model="radioPayment">
          <van-radio name="wx">微信支付</van-radio>
          <van-radio name="ali">支付宝支付</van-radio>
        </van-radio-group>
      </div>
      <div class='goods'>
        <ul>
          <li
            v-for='(item,index) in goodsList'
                        :key='index'
          >
             <div>
              <img :src="item.goods_imgUrl" alt="">
            </div>
            <div class='goods-content'>
              <h4>{{item.goods_name}}</h4>
              <div class='goods-total'>
                <span>¥{{item.goods_price}}</span>
                <span>x{{item.goods_num}}</span>
              </div>
            </div>
          </li>
        </ul>
        <h3 class="h3">订单号：{{total.id}}</h3>
      </div>
      </div>
    </section>
    <footer>
      <div class="order-total">
        <span>共</span>
        <b>{{total.num}}</b>
        <span>件，</span>
        <span>总价:</span>
        <em>¥{{total.price}}</em>
      </div>
      <div class="order-topay" @click='goPayment'>
        提交订单
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import http from '@/common/api/request.js'
import BetterScroll from 'better-scroll'
import eventBus from '@/common/eventBus.js'
import qs from 'qs'
// import { Toast } from 'mint-ui'

// import { log } from 'console'

export default {
  data() {
    return {
      radioPayment: 'wx',
      path: {},
      BetterScroll: '',
      item: [],
      total: {
        num: 0,
        price: 0
      }
    }
  },
  computed: {
    ...mapState({

      order_id: state => state.order.order_id,
      selectList: state => state.cart.selectList

    }),
    ...mapGetters(['defaultPath'])

  },

  created() {
    // console.log(this.$route.query)
    // 选中商品id
    this.goodsList = JSON.parse(this.$route.query.goodsList)
    console.log(this.goodsList)
    this.selectAddress()
  },
  activated() {
    eventBus.$on('selectPath', function(data) {
      this.path = JSON.parse(data)
    }.bind(this))
    this.item = JSON.parse(this.$route.query.goods)

    this.goodsList = JSON.parse(this.$route.query.goodsList)
    this.selectOrder()
  },
  methods: {
    ...mapMutations(['initPath', 'initOrder']),
    goPath() {
      this.$router.push({
        path: '/path',
        query: {
          type: 'select'
        }
      })
    },
    // 查询地址
    selectAddress() {
      http
        .$axios({
          url: '/api/selectAddress',
          method: 'post',
          headers: {
            token: true
          }
        })
        .then((res) => {
          this.initPath(res.data)
          console.log(res.data)
          if (this.defaultPath.length > 0) {
            this.path = this.defaultPath[0]
          } else {
            this.path = res.data[0]
          }
        })
    },
    // 查询订单
    selectOrder() {
      http
        .$axios({
          url: '/api/selectOrder',
          method: 'post',
          headers: {
            token: true
          },
          data: {
            orderId: this.order_id
          }
        }).then(res => {
          console.log(res.data[0])
          this.initOrder(res.data)

          this.total = {
            id: res.data[0].order_id,
            num: res.data[0].goods_num,
            price: res.data[0].goods_price
          }
        })
    },
    goPayment() {
      http
        .$axios({
          url: '/api/submitOrder',
          method: 'post',
          headers: {
            token: true
          },
          data: {
            orderId: this.order_id,
            selectGoodsId: this.selectList
          }
        }).then(res => {
          console.log(res)
          const nameArr = []
          this.goodsList.forEach(v => {
            nameArr.push(v.goods_name)
          })
          console.log(nameArr.join(''))
          const orderData = {
            orderId: this.order_id,
            name: nameArr.join(''),
            price: this.total.price
          }
          if (res.success) {
            http
              .$axios({
                url: '/api/payment',
                method: 'post',
                headers: {
                  token: true,
                  'Content-Type': 'application/x-www-form-urlencoded'

                },
                data: qs.stringify(orderData)
              }).then(res => {
                console.log(res)
                if (res.success) {
                  // 打开支付宝支付的页面
                  window.location.href = res.paymentUrl
                }
              })
          }
        })
    }

  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      movable: true,
      zoom: true,
      click: true
    })
  }
}
</script>

<style lang='scss' scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  color: #fff;
  background-color: cadetblue;
  i {
    padding: 0 0.4rem;
    font-size: 0.586666rem;
  }
  span {
    font-weight: 300;
    font-size: 0.48rem;
  }
}
section {
  background-color: #f7f7f7;
  .path-title {
    height: .3rem;
    padding: 0.4rem;
    font-size: 0.4rem;
    color: #b0352f;
  }
  .path-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.16rem 0.4rem;
    font-size: 0.3rem;
    background-color: #ffffff;
    span {
      padding-right: 0.16rem;
    }
  }
  .payment {
    padding: 0.06rem 0.4rem;
    margin-top: 0.2rem;
    font-size: 0.3rem;
    background-color: #ffffff;
    .van-radio-group {
      display: flex;
      padding: 0.16rem 0;
      .van-radio {
        padding-right: 0.266666rem;
      }
    }
    ::v-deep .van-radio__label {
      line-height: 0.575rem;
    }
  }
  .goods {
    padding: 0.16rem 0.4rem;
    margin-top: 0.2rem;
    font-size: 0.26666rem;
    background-color: #ffffff;
    ul {
      width: 100%;
      li {
        display: flex;
        width: 100%;
        img {
          width: 1.973333rem;
          height: 1.573333rem;
        }
        .goods-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 0.4rem;
          .goods-total {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.2rem;
  border-top: 1px solid #ccc;
  .order-total {
    font-size: 0.426666rem;
    span {
      padding: 0 0.16rem;
    }
    b {
      color: #b0352f;
    }
    em {
      font-size: 0.48rem;
      color: #b0352f;
    }
  }
  .order-topay {
    width: 3.2rem;
    line-height: 1.2rem;
    color: #fff;
    font-size: 0.426666rem;
    text-align: center;
    background-color: cadetblue;
  }
}
.h3{
  margin-top: .6375rem;
}
::v-deep .van-icon-arrow{
  color: #b0352f;
  margin-right: 0;
  align-items: center;
  text-align: center;
}
</style>
