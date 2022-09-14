<template>
  <div class="icons">
    <li v-for="(item,index) in iconsList" :key="index">
      <img :src="item.imgUrl" alt="">
      <span>{{item.title}}</span>
    </li>

  </div>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    iconsList: Array
  },
  data() {
    return {
      // iconsList: [
      //   { id: 1, title: 1, imgUrl: './images/icons1.png' },
      //   { id: 2, title: 2, imgUrl: './images/icons2.png' },

      //   { id: 3, title: 3, imgUrl: './images/icons3.png' },

      //   { id: 4, title: 4, imgUrl: './images/icons4.png' },

      //   { id: 5, title: 5, imgUrl: './images/icons5.png' }

      // ]
    }
  }
}
</script>

<style scoped>
.icons{
  display: flex;
  justify-content: space-around;
  margin: .3125rem 0;
}
.icons li{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icons img{
  width: 1rem;
  height: 1rem;
}
.icons span{
  font-size: .45rem;
}

</style>
