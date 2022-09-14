<template>
  <div class="search-list">
    <div class="headers">
      <Header></Header>
      <ul class="tab">
        <li v-for="(item,index) in searchList.data" :key="index"
        @click='changeTab(index)'>
          <div :class="searchList.currentIndex==index?'active':''">{{item.name}}</div>
          <div class="search-filter" v-if="index!=0">
            <i class="iconfont icon-arrow_up_fat"
             :class="item.status==1?'active':''"
            ></i>
            <i class="iconfont icon-arrow_down_fat"
             :class="item.status==2?'active':''"
            ></i>
          </div>
        </li>

      </ul>
    </div>
    <section ref="wrapper">
      <ul v-if="goodsList.length">
        <li v-for="(item,index) in goodsList" :key="index">
          <img :src="item.imgUrl" alt="">
          <div class="nr">
            <h3>{{item.name}}</h3>
            <h4>销量：{{item.num}}</h4>
          </div>
          <div class="price">
            <div>
              <span>￥</span>
              <b>{{item.price}}</b>
            </div>
            <div @click='addCart(item.id)'>加入购物车</div>
          </div>
        </li>
      </ul>
      <div v-else class="zw">暂无此产品......</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
// eslint-disable-next-line no-unused-vars
import http from '@/common/api/request.js'
// eslint-disable-next-line no-unused-vars
import BetterScroll from 'better-scroll'
// const BetterScroll = require('better-scroll')
import { Toast } from 'vant'
import { mapState } from 'vuex'
import router from '@/router/index.js'

export default {
  components: { Header, Tabbar },
  data() {
    // eslint-disable-next-line no-labels, no-unused-expressions
    return {
      id: '',
      goodsList: [],
      sBetterScroll: '',
      searchList: {
        currentIndex: 0,
        data: [
          // /*
          // status:0 都不亮
          // status:1 上箭头亮
          // status:2 下箭头亮
          // */
          { name: '综合', key: 'zh' },
          { name: '价格', status: 0, key: 'price' },
          { name: '销量', status: 0, key: 'num' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    }),
    orderBy() {
      // 确定 综合 价格 销量 中的哪一个
      const obj = this.searchList.data[this.searchList.currentIndex]
      // 确定是升序还降序
      // eslint-disable-next-line eqeqeq
      const val = obj.status == '1' ? 'asc' : 'desc'
      return {
        [obj.key]: val
      }
    }
  },
  created() {
    // console.log(this.goodsList)

    this.getData()
  },
  // activated() {
  //   // eslint-disable-next-line eqeqeq
  //   if (this.id != this.$route.query.id) {
  //     this.getData()
  //     this.id = this.$route.query.id
  //   }
  // },
  methods: {
    addCart(id) {
      if (!this.token) {
        router.push('/login')
      } else {
        console.log(id)
        http.$axios({
          url: '/api/addCart',
          method: 'post',
          params: {
          },
          data: {
            goodsId: id
          },
          headers: {
            token: true
          }
        })
          .then((res) => {
            console.log(res.data)
            if (res.success) {
              Toast('添加购物车成功')
            }
          })
      }
    },
    async getData() {
      // eslint-disable-next-line no-unused-vars, prefer-const
      // let id = this.$route.query.id
      const res = await http
        .$axios({
          url: '/api/goods/shopList',
          params: {
            searchName: this.$route.query.key,
            ...this.orderBy
            // id
          }
        })
        // .then((res) => {
      this.goodsList = res
      this.$nextTick(() => {
      // eslint-disable-next-line no-new
        this.sBetterScroll = new BetterScroll(this.$refs.wrapper, {
          // movable: true,
          // zoom: true,
          click: true
        })
      })
      // console.log(res[0])
      // })
    },
    changeTab(index) {
      this.searchList.currentIndex = index
      const items = this.searchList.data[index]

      this.searchList.data.forEach((v, i) => {
        // eslint-disable-next-line eqeqeq
        if (i != index) {
          v.status = 0
        }
      })
      // 当前点击的改变状态
      // eslint-disable-next-line eqeqeq
      if (this.searchList.currentIndex == index) {
        // eslint-disable-next-line eqeqeq
        items.status = items.status == 1 ? '2' : '1'
      }
      // 发送请求进行数据排序
      this.getData()
    }
  },
  mounted() {

  },

  // 检测路由是否改变
  watch: {
    $route() {
      this.getData()
    }
  }
}
</script>

<style scoped lang="scss">
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers ul {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-around;
  padding: 0.333333rem 0;
  font-size: 0.326666rem;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.headers ul li > div {
  padding: 0 0.08rem;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
}
section {
  flex: 1;
  overflow: hidden;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 50%;
      padding: 0.266666rem;
    }
  }
}

section ul li img {
  width: 4.533333rem;
  height: 4.533333rem;
}
section ul li img[lazy="loading"] {
  background-color: #f7f7f7;
}

h3 {
  width: 100%;
  font-size: 0.373333rem;
  color: #222;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
section ul li .price {
  display: flex;
  justify-content: space-between;
  padding: 0.266666rem 0;
  width: 100%;
  font-size: 14px;
}
section ul li .price div:first-child span {
  font-size: 0.32rem;
  color: #b0352f;
}
section ul li .price div:first-child b {
  color: #b0352f;
  font-size: 0.426666rem;
}
section ul li .price div:last-child {
  padding: 0.08rem 0.16rem;
  color: #fff;
  background-color: #b0352f;
  border-radius: 0.16rem;
}

.zw{
  color: red;
  text-align: center;
}
.active{
  color: #b0352f;
}
.tab{
  height: .1rem;
}
</style>
