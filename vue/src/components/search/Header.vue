<template>
  <header>
    <div class="search-return" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList" >
        <input
          type="search"
          placeholder="搜索您喜欢的产品..."
          v-model="searchVal"
          ref='txt'
        >
      </form>
    </div>
    <div class="serach-btn" @click="goSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchVal: this.$route.query.key || '',
      searchArr: []
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goSearchList() {
      if (!this.searchVal) return
      if (!localStorage.getItem('searchList')) {
        localStorage.setItem('searchList', '[]')
      } else {
        this.searchArr = JSON.parse(localStorage.getItem('searchList'))
      }
      // 添加数据
      this.searchArr.unshift(this.searchVal)

      // ES6去重 new Set
      const newArr = new Set(this.searchArr)
      // 保存到本地
      localStorage.setItem('searchList', JSON.stringify(Array.from(newArr)))

      // console.log(this.searchVal)
      // 跳转页面
      // eslint-disable-next-line eqeqeq
      if (this.searchVal == this.$route.query.key) return
      this.$router.push({
        name: 'list',
        query: {
          key: this.searchVal
        }
      })
      // this.searchVal = ''
    }
  },
  mounted() {
    // console.log(this.$refs.txt)
    this.$refs.txt.focus()
  }
}
</script>

<style lang="scss" scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.1rem;
  color: #fff;
  background-color: cadetblue;
}
.search-return,
.serach-btn {
  padding: 0 0.266666rem;
}
.search-return i {
  font-size: 0.746666rem;
}
.search-main {
  display: flex;
  align-items: center;
  width: 6.933333rem;
  height: 0.7rem;
  border-radius: 12px;
  background-color: #ffffff;
}
.search-main i {
  padding: 0 0.266666rem;
  color: #666666;
}
.search-main form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  input{
  width: 100%;
  font-size: 0.4rem;

  color: #000;
  }
}

.search-main form input {
  width: 100%;
}
.serach-btn {
  font-size: 0.4rem;
}

</style>
