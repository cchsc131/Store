<template>
  <div class="like">
    <Card>
      <span>猜你喜欢</span>
    </Card>
    <ul>
      <li v-for="(item,index) in likeList"
      :key="index"
      @click="goDetail(item.id)">
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
import Card from '@/components/home/Card.vue'
export default {
  name: 'Like',
  props: {
    likeList: Array
  },
  components: {
    Card
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id
        }
      })
    }
  },
  data() {
    return {
      // listList: [
      //   {
      //     id: 1,
      //     title: '龙井',
      //     content: '6666666666666',
      //     price: '68',
      //     imgUrl: './images/goods1.jpg'
      //   },
      //   {
      //     id: 2,
      //     title: '龙井',
      //     content: '66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666',
      //     price: '88',
      //     imgUrl: './images/goods3.jpg'
      //   },
      //   {
      //     id: 3,
      //     title: '龙井',
      //     content: '6666666666666',
      //     price: '88',
      //     imgUrl: './images/goods4.jpg'
      //   }
      // ]
    }
  }
}
</script>

<style scoped>
.like ul {
  display: flex;
  flex-wrap: wrap;
}
.like ul li {
  /* display: flex; */
  position: relative;
  width: 50%;
  text-align: center;
}

.like ul li h2 {
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.like img {
  width: 5rem;
  height: 4rem;
}
.like h3 {
  width: 100%;
  align-items: center;
  overflow: hidden;
  line-height: 0.45rem;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.45rem;
}
.like p {
  width: 100%;
  overflow: hidden;
  line-height: 0.35rem;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.35rem;
}
.like ul li span {
  color: red;
}
</style>
