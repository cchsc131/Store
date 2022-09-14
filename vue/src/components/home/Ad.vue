<template>
  <div class="ad">
    <li v-for="(item,index) in adList" :key="index">
      <img :src="item.imgUrl" alt="">
    </li>
  </div>
</template>

<script>
export default {
  name: 'Ad',
  props: {
    adList: Array
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .ad{
    width: 100%;
  }
  .ad img{
    width: 100%;
  }
</style>
