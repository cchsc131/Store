<template>
  <div class="recommend">
    <Card>
      <span>爆款推荐</span>
    </Card>
    <ul>
      <li v-for="(item,index) in recommendList" :key="index">
        <h2><img :src="item.imgUrl" alt=""></h2>
        <div>
          <h3>{{item.title}}</h3>
          <p>{{item.content}}</p>
          <div class="price">
            <span>￥{{item.price}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  name: 'Recommend',
  props: {
    recommendList: Array
  },
  data() {
    return {
      // recommendList: [
      //   {
      //     id: 1,
      //     title: '龙井',
      //     content: '6666666666666',
      //     price: '68',
      //     imgUrl: './images/recommend.jpeg'
      //   },
      //   {
      //     id: 2,
      //     title: '龙井',
      //     content: '6666666666666',
      //     price: '88',
      //     imgUrl: './images/recommend.jpeg'
      //   }
      // ]
    }
  },
  components: { Card }
}
</script>

<style scoped>
.recommend ul li {
  position: relative;
}
.recommend ul li img {
  width: 10rem;
  height: 3.8rem;
  border-radius: 0.35rem;
}
.recommend ul li h2 {
  align-items: center;
}
.recommend ul li > div {
  position: absolute;
  right: 0;
  top: 0;
  /* padding:  .225rem .225rem;
  font-size: .4rem; */
}
.recommend ul li > div {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 0.533333rem;
}
.price {
  color: red;
  font-size: 0.5rem;
  margin-top: 0.3rem;
  /* margin-right: 0; */
  /* align-items: center; */
  text-align: center;
  /* right: 0; */
}
</style>
