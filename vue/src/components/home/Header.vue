<template>
 <header>
   <h1>
     <img src="@/assets/images/logo.png" alt="">
   </h1>
   <div class="search" @click="goSearch">
     <li class="iconfont icon-fangdajing"></li>
     <span>搜索</span>
   </div>
   <div class="kefu">
     <li class="iconfont icon-kefu"></li>
   </div>

 </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 1.25rem;
  background-color: cadetblue;
}
header h1{
  padding: 0 .2rem;
}
header h1 img{
  width: 1.9rem;
  height: 1rem;
}
.search{
  display: flex;
  align-items: center;
  width: 6.6rem;
  height: .85rem;
  background-color: #fff;
  border-radius: 1.375rem;
}
.search li{
  padding: 0 .16rem;
  color: #ccc;
}
.search span{
  /* padding: 0 .16rem; */
  font-size: .4rem;
  color: #ccc;
}
.kefu li{
  font-size: 1.1rem;
  color: #fff;
}
</style>
