<template>
  <div class="login-container">
    <div style="text-align:center;">
      <el-card class="box-card" shadow="always" justify="center">
        <div slot="header" class="clearfix">
          <span style="font-size:20px;font-weight:600">Completed project</span>
        </div>
        <el-card shadow="hover">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            v-loading.fullscreen.lock="fullscreenLoading"
          >
            <el-table-column prop="id" label="Office ID" width="180"></el-table-column>
            <el-table-column prop="name" label="Office Name" width="180"></el-table-column>
            <el-table-column prop="address" label="Address"></el-table-column>
          </el-table>
          <div style="margin-top:20px">
            <el-button
              type="primary"
              @click="redirectRecommend()"
              style="float:right;margin-bottom:2%"
            >Back</el-button>
          </div>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/api'
export default {
  data() {
    return {
      checked: true,
      fullscreenLoading: false,
      tableData: []
    }
  },
  created() {
    this.fullscreenLoading = true
    var param_userid = this.$route.query.userId
    console.log('complete page', param_userid)
    //加载页面时，从后台获取数据
    get('/cust/query/' + param_userid).then(res => {
      console.log('后台返回值：', res)
      if (res != null) {
        this.fullscreenLoading = false
        this.tableData = res
      } else {
        alert('failed')
      }

      this.fullscreenLoading = false
    })
  },
  methods: {
    redirectRecommend() {
      var param_userid = this.$route.query.userId
      this.$router.push({
        path: '/recommend',
        query: { userId: param_userid }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title-format {
  font-size: 18px;
  line-height: 28px;
}
.confirm-button {
  width: 40%;
  height: 12%;
  margin-top: 5%;
  margin-right: 3%;
}
.box-card {
  width: 40%;
  height: 30%;
  margin-top: 2%;
  margin-left: 30%;
}
.input-order-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
