<template>
    <div class="pay">
        <h3>你的订单已支付成功!</h3>
        <h3 @click="goHome">点击返回<h3 class="sy">首页</h3></h3>
    </div>
</template>

<script>
import router from '@/router'
export default {
  methods: {
    goHome() {
      router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.pay{
    // display: block;
 h3{
    margin: .625rem auto;
    text-align: center;
 }
}
.sy{
    color: burlywood;
}
</style>
