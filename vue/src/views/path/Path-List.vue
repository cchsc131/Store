<template>
    <div class='path-index container'>
        <Header>
            <span v-if="pathStatus">添加地址</span>
            <span v-else>编辑地址</span>
        </Header>
        <section>
            <van-address-edit v-if="pathStatus"
              :area-list="areaList"
              show-set-default
              show-search-result
               :search-result="searchResult"
               :area-columns-placeholder="['请选择', '请选择', '请选择']"
              @save="onAdd"

            />

           <!-- 编辑 -->

            <van-address-edit v-else

              :address-info="AddressInfo"
              :area-list="areaList"
              show-delete
              show-set-default
              show-search-result
              :search-result="searchResult"
              :area-columns-placeholder="['请选择', '请选择', '请选择']"
              @save="onUpdate"
              @delete="onDelete"
            />
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
import http from '@/common/api/request.js'

import Header from '@/components/path/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'Path-List',
  data() {
    return {
      // eslint-disable-next-line no-undef
      AddressInfo: {},
      areaList,
      searchResult: [],
      pathStatus: false
    }
  },
  components: {
    Header,
    Tabbar
  },
  mounted() {
    console.log(JSON.parse(this.$route.params.key))
    const key = JSON.parse(this.$route.params.key)
    // eslint-disable-next-line eqeqeq, no-undef
    // 添加
    // eslint-disable-next-line eqeqeq
    if (key == 'add') {
      this.pathStatus = true
    } else {
      // 编辑
      this.AddressInfo = key
      // eslint-disable-next-line eqeqeq, no-unneeded-ternary, space-infix-ops
      this.AddressInfo.isDefault = this.AddressInfo.isDefault == 1 ? true : false
    }
  },
  methods: {

    // 点击保存---添加
    onAdd(content) {
      // console.log(content)
      // eslint-disable-next-line eqeqeq
      content.isDefault = content.isDefault == true ? 1 : 0

      http.$axios({
        url: '/api/addAddress',
        method: 'post',
        headers: {
          token: true
        },
        data: {
          ...content
        }
      }).then(res => {
        if (!res.success) return
        // console.log(res)
        Toast(res.msg)
        this.$router.push('/path')
      })
      // eslint-disable-next-line eqeqeq
    },
    // 点击保存---修改
    onUpdate(content) {
      // console.log(content)
      // eslint-disable-next-line eqeqeq
      content.isDefault = content.isDefault == true ? 1 : 0

      http.$axios({
        url: '/api/updateAddress',
        method: 'post',
        headers: {
          token: true
        },
        data: {
          ...content
        }
      }).then(res => {
        if (!res.success) return
        // console.log(res)
        Toast(res.msg)
        this.$router.push('/path')
      })
    },
    onDelete(content) {
      http.$axios({
        url: '/api/deleteAddress',
        method: 'post',
        headers: {
          token: true
        },
        data: {
          id: content.id
        }
      }).then(res => {
        if (!res.success) return
        // console.log(res)
        Toast(res.msg)
        this.$router.push('/path')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
section{
    background-color: #F7F7F7;
    .van-address-edit{
        padding: 0;
    }
    ::v-deep .van-address-edit__buttons{
        display: flex;
        justify-content: center;
        align-items:center;
        flex-wrap: wrap;
    }
    ::v-deep .van-button--danger{
        width: 5rem;
        height: .95rem;
        background-color: cadetblue;
    }
    ::v-deep .van-button--default{
      width: 5rem;
        height: .95rem;
    }
}
::v-deep .tabbar{
    border-top:2px solid #ccc;
}
</style>
