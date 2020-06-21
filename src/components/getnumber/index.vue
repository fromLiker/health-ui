<template>
  <div style="text-align:center; padding-top: 30px;">
    <h1>Welcome to Wear-Mask Medical Center!</h1>
    <el-card class="box-card" body-style shadow="hover" justify="center">
      <el-button
        type="primary"
        plain
        class="confirm-button el-icon-s-custom"
        @click="queueup()"
      >Generate ID</el-button>
      <br />
      <br />
      <div v-if="queuenum != ''">
        <h1>YOUR ID</h1>
        <hr />
        <h1>{{queuenum }}</h1>
        <hr />
      </div>
    </el-card>
  </div>
</template>

<script>
import { get } from '../../utils/api'

export default {
  data() {
    return {
      queuenum: ''
    }
  },
  created: function() {},
  methods: {
    queueup() {
      // url: /cust/add
      get('/cust/add').then(res => {
        console.log(res)
        let tmp = res.id
        this.queuenum = tmp.split('_')[1]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
  opacity: 0.8;
}
</style>
