<template>
  <div class='cart container'>
    <header>
      <i class='iconfont icon-fanhui' @click="$router.back()"></i>
      <span>购物车</span>
      <span @click="change" v-text='isChange ? "完成":"编辑"'></span>

    </header>
     <!-- v-if='list.length' -->
    <section ref="wrapper">
      <div v-if='list.length'>

        <div class='cart-title'>
        <van-checkbox @click="checkedAllFn" :value="checkedAll"></van-checkbox>
        <span>全选</span>
      </div>
      <ul>
        <li v-for='(item,index) in list' :key='index'>
          <div class='check'>
            <van-checkbox @click="checkItem(index)" v-model="item.checked"></van-checkbox>
          </div>
          <h2>
            <img :src="item.goods_imgUrl" alt="">
          </h2>
          <div class='goods'>
            <div class='goods-title'>
              <span>{{item.goods_name}}</span>
              <i class='iconfont icon-lajitong' @click="deleteFn(item.id)"></i>
            </div>
            <div class='goods-price'>¥{{item.goods_price}}</div>
            <van-stepper @change="changeNum($event,item)" v-model="item.goods_num" integer theme='round' />
          </div>
        </li>
      </ul>
      </div>
      <div v-else>
      没有购物车数据
      <router-link to='/home'>去首页逛逛吧</router-link>
    </div>
    </section>

    <footer v-if='list.length'>
      <div class='radio'>
                <van-checkbox @click="checkedAllFn" :value="checkedAll"></van-checkbox>

      </div>
      <div class='total' v-if="!isChange">
        <div>
          共有
          <span class='total-active'>{{total.num}}</span>
          件商品
        </div>
        <div>
          <span>总计：</span>
          <span class='total-active'>¥{{total.price.toFixed(2)}} + 0茶币</span>
        </div>
      </div>
      <div class='order' v-if='!isChange' @click="goOrder">去结算</div>
      <div class='order' v-else @click="deleteFn">删除</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import BetterScroll from 'better-scroll'
import { Toast } from 'mint-ui'

import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
// import BetterScroll from 'better-scroll'

export default {
  // name: 'Cart',
  data() {
    return {
      isChange: false,
      checked: true,
      path: {},
      BetterScroll: ''
      // newList: []

    }
  },
  computed: {
    ...mapState({
      list: state => state.cart.list,
      selectList: state => state.cart.selectList
    }),
    ...mapGetters(['checkedAll', 'total']),
    goodsList() {
      return this.selectList.map(id => {
        // console.log(id)
        // eslint-disable-next-line eqeqeq
        return this.list.find(v => v.id == id)
      })
    }
  },
  created() {
    this.getData()
    http
      .$axios({
        url: '/api/selectAddress',
        method: 'post',
        headers: {
          token: true
        }
      })
      .then((res) => {
        // this.initPath(res.data)

        this.path = res.data[0]
      })
  },
  methods: {
    ...mapMutations(['cartList', 'checkItem', 'initOrder', 'initPath']),
    ...mapActions(['checkedAllFn', 'deleteFn']),
    async getData() {
      const res = await http.$axios({
        url: '/api/selectCart',
        method: 'post',
        headers: {
          token: true
        }
      })

      res.data.forEach(v => {
        v.checked = true
      })

      // 必须放后面  这个位置
      this.cartList(res.data)

      // console.log(res.data)
    },
    change() {
      this.isChange = !this.isChange
    },
    changeNum(value, item) {
      console.log(value, item.id)
      http.$axios({
        url: '/api/changeNum',
        method: 'post',
        headers: {
          token: true
        },
        data: {
          num: value,
          id: item.id
        }
      }).then(res => {
        console.log(res)
      })
    },
    goOrder() {
      if (!this.path) {
        this.$router.push('/path')
        return Toast('请选择收货地址')
      }
      if (!this.selectList.length) {
        Toast('请选择需要购买的商品')
        // eslint-disable-next-line no-useless-return
        return
      }
      const newList = []

      this.list.forEach(item => {
        // eslint-disable-next-line array-callback-return
        this.selectList.filter(v => {
          // eslint-disable-next-line eqeqeq
          if (v == item.id) {
            newList.push(item)
          }
        })
      })
      // 生成订单
      http.$axios({
        url: '/api/addOrder',
        method: 'post',
        headers: {
          token: true
        },
        data: {
          newList: newList
        }
      }).then(res => {
        if (!res.success) return
        console.log(res.data)
        this.initOrder(res.data)
        this.$router.push({
          path: '/order',
          query: {
            goods: JSON.stringify(this.selectList),
            goodsList: JSON.stringify(this.goodsList)
          }

        })
      })
    }
  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      // movable: true,
      // zoom: true,
      click: true

    })
  }
}
</script>
<style scoped lang="scss">
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.173333rem;
    color:#fff;
    background-color: cadetblue;
    i{
        padding:0 0.4rem;
        font-size:0.586666rem;
    }
    span{
        padding:0 0.4rem;
        font-size:0.426666rem;
    }
}
section{
    background-color: #f5f5f5;
    .cart-title{
        display: flex;
        padding: .15rem 0.533333rem;
        span{
            padding:0 0.4rem;
            font-weight: 500;
            font-size:0.48rem;
        }
    }
    ul{
      // height: 1000rem;
        display: flex;
        flex-direction: column;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0.16rem 0.533333rem;
            margin:0.213333rem 0;
            background-color: #fff;
            .check{
                padding-right:0.373333rem;
            }
            .goods{
                display: flex;
                flex-direction: column;
                padding-left: .4rem;
                font-size:0.32rem;
                .goods-title{
                    display: flex;
                    i{
                        font-size:0.586666rem;
                    }
                }
                .goods-price{
                    padding:0.08rem 0;
                    color:#b0352f;
                }
                ::v-deep .van-stepper{
                    text-align: right;
                }
            }
            img{
                width: 1.973333rem;
                height: 1.973333rem;
            }
        }
    }
}
footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.28rem;
    border-top:0.053333rem solid #ccc;
    .radio{
        padding:0 0.4rem;
    }
    .total{
        flex:1;
        font-size:0.32rem;
        .total-active{
            color:#b0352f;
        }
    }
    .order{
        width: 3.2rem;
        line-height: 1.28rem;
        color:#fff;
        text-align: center;
        font-size: 0.426666rem;
        background-color: cadetblue;
    }
}
</style>
