<template>
    <div class='path-index container'>
        <Header></Header>
        <section  ref="wrapper">
            <ul v-if="list.length">
                <li  v-for="(item,index) in list" :key="index" @click="goList(item)">
                    <div>
                        <span>{{item.name}}</span>
                        <span>{{item.tel}}</span>
                    </div>
                    <div>
                        <span class='active' v-if="item.isDefault==1">[默认]</span>
                        <span>{{item.province}}</span>
                        <span>{{item.city}}</span>
                        <span>{{item.county}}</span>
                        <span>{{item.addressDetail}}</span>
                    </div>
                </li>
                <!-- <div v-if="pathStatus = true"></div> -->
            <div class='add-Path' @click='goList("add")' v-if="flag==false">添加地址</div>

            </ul>
            <h1 v-else>暂无数据，请添加地址

            <div class='add-path' @click='goList("add")'>添加地址</div>
            </h1>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/path/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import { mapMutations, mapState } from 'vuex'
import http from '@/common/api/request.js'
import BetterScroll from 'better-scroll'
import eventBus from '@/common/eventBus.js'

// import Scroll from '@/components/common/Scroll.vue'

export default {
  data() {
    return {
      BetterScroll: '',
      // 从提交订单页 跳转过来的
      pathStatus: false,
      flag: false
    }
  },
  components: {
    Header,
    Tabbar
  },
  computed: {
    ...mapState({ list: state => state.path.list })
  },
  created() {
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.type == 'select') {
      this.pathStatus = true
      this.flag = true
    }
    this.getData()
  },
  methods: {
    ...mapMutations(['initPath']),
    goList(option) {
      if (this.pathStatus) {
        eventBus.$emit('selectPath', JSON.stringify(option))
        this.$router.back()
      }
      console.log(option)
      this.$router.push({
        name: 'Path-List',
        params: {
          key: JSON.stringify(option)
        }
      })
    },
    getData() {
      http.$axios({
        url: '/api/selectAddress',
        method: 'post',
        headers: {
          token: true
        }
      }).then(res => {
        this.initPath(res.data)
      })
      this.$nextTick(() => {
        /* eslint-disable no-new */
        this.tBetterScroll = new BetterScroll(this.$refs.wrapper, {
          // movable: true,
          // zoom: true,
          click: true

        })
      })
      // this.$nextTick(() => {
      //   /* eslint-disable no-new */
      //   this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
      //     movable: true,
      //     zoom: true,
      //     click: true

      //   })
      // })
    }

  },
  mounted() {

  }
}
</script>

<style lang='scss' scoped>
section{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F7F7F7;
    ul{
          position: relative;

        width: 100%;
        li{
            padding:0.266666rem 0.4rem;
            margin:0.16rem 0;
            background-color: #FFFFFF;
            span{
                padding-right:0.4rem;
                font-size:0.426666rem;
            }
            .active{
                color:#b0352f;
            }
        }

    }
    .add-path{
      margin-left: 50%;
        // z-index: 3;
        -webkit-transform: translate(-50%,0);
        margin-top:0.8rem;
        width: 3.2rem;
        line-height: 1.066666rem;
        font-size:0.48rem;
        text-align: center;
        color:#FFFFFF;
        background-color: cadetblue;
        border-radius: 6px;
    }
}
::v-deep .tabbar{
    border-top:2px solid #ccc;
}
// .wrapper{
//   height: 8.75rem;
//   // background-color: aqua;
//   overflow: hidden;
// }
.add-Path{
  // position: absolute;
        // top: 50%;
        // margin-top: .8rem;
        margin-left: 50%;
        // z-index: 3;
        -webkit-transform: translate(-50%,0);
          width: 3.2rem;
          height: 1.066666rem;
        line-height: 1.066666rem;
        font-size:0.48rem;
        text-align: center;
        color:#FFFFFF;
        background-color: cadetblue;
        border-radius: 6px;
        // margin: .5rem .5rem;
        // left: 50%;
        }
</style>
