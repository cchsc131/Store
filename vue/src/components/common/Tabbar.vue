<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item,index) in routerList" :key="index" @click="switchTab(item.path)">
        <!-- {{}} -->
        <img :src="$route.path.includes(item.path) ? item.selected : item.active" alt="">
        <span :class="$route.path.includes(item.path) ? 'select' : '' ">{{item.title}}</span>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home',
          active: '/images/home.png',
          selected: '/images/home-select.png'
        },
        {
          title: '分类',
          path: '/list',
          active: '/images/list.png',
          selected: '/images/list-select.png'
        },
        {
          title: '购物车',
          path: '/cart',
          active: '/images/cart.png',
          selected: '/images/cart-select.png'
        },
        {
          title: '我的',
          path: '/my',
          active: '/images/my.png',
          selected: '/images/my-select.png'
        }
      ]
    }
  },
  methods: {
    switchTab(path) {
      if (this.$route.path === path) return
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.tabbar {
  /* position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999; */
  background-color: #fff;
  width: 100%;
  height: 0.9rem;
}
.tabbar ul {
  display: flex;
  /* 间距 */
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
}
.tabbar ul li {
  /* flex: 1; */
  display: flex;
  /* 上下排列 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar ul li img {
  width: 0.42rem;
  height: 0.42rem;
  /* border-radius:.3125rem */
}
.tabbar ul li span {
  font-size: 0.256666rem;
}
.select {
  color: red;
}
</style>
