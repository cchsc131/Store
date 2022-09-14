<template>
  <div class="home">

    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <div id="app">
          <ly-tabs v-model="tabsValue" :activeColor='activeColor' @change="handleTabsChange">
            <ly-tab-item v-for="item in tabsItems" :key="item.value" :title="item.title" :name="item.value" :badge="item.badge" />
          </ly-tabs>
        </div>
      </div>
    </div>

    <section ref="wrapper">
      <div>
        <div v-for="(item,index) in newData" :key="index">
          <!-- {{item.data}} -->
          <Swiper v-if="item.type=='swiperList'" :swiperList="item.data"></Swiper>
          <Icons v-if="item.type=='iconsList'" :iconsList="item.data"></Icons>
          <Recommend v-if="item.type=='recommendList'" :recommendList="item.data"></Recommend>
          <Like v-if="item.type=='likeList'" :likeList="item.data"></Like>
          <Ad v-if="item.type=='adList'" :adList="item.data"></Ad>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue"
// import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
// import { LyTabs } from 'ly-tab'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import BetterScroll from 'better-scroll'
import Like from '@/components/home/Like.vue'
import Ad from '@/components/home/Ad.vue'
// import { Indicator } from 'mint-ui'
import http from '@/common/api/request.js'
// import axios from 'axios'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Header,
    // LyTabs,
    Swiper,
    Icons,
    Recommend,
    Tabbar,
    Like,
    Ad
  },
  data() {
    return {
      tabsValue: '1',
      tabsItems: [],
      newData: [],
      activeColor: 'red',
      oBetterScroll: '',
      tBetterScroll: ''
    }
  },
  methods: {
    async getData() {
      // eslint-disable-next-line no-unused-vars, prefer-const
      let res = await http.$axios({
        url: '/api/index_list/1/data/1'
      })
      this.tabsItems = Object.freeze(res.topBar)
      // console.log(res.data.data.topBar)
      this.newData = Object.freeze(res.data)
      // console.log(Object.freeze(res.data.data.data))
      //
      // Indicator.close()
      //
      this.$nextTick(() => {
        /* eslint-disable no-new */
        this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click: true

        })
      })
    },

    async addData(value) {
      // eslint-disable-next-line no-unused-vars, prefer-const
      let res = await http.$axios({
        url: '/api/index_list/' + value + '/data/1'
      })
      // eslint-disable-next-line eqeqeq
      if (res.constructor != Array) {
        this.newData = res.data
      } else {
        this.newData = res
      }

      this.$nextTick(() => {
        /* eslint-disable no-new */
        this.tBetterScroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          click: true

        })
      })
    },

    handleTabsChange(value) {
      console.log('LyTabs change:', value)
      this.addData(value)
    }
  },
  created() {
    this.getData()
  }
  // mounted() {

  // }
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 2rem;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
}
section {
  flex: 1;
  overflow: hidden;
}
.ly-tabs {
  /* display: flex; */
  position: fixed;
  top: 1.1rem;
  left: 0;
  border-bottom: none;
}
#app {
  color: cadetblue;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
