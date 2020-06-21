<template>
  <div class="login-container">
    <div style="text-align:center;">
      <h1 style="padding-top: 120px;">Welcome to Wear-Mask Medical Center!</h1>
      <el-card class="box-card" shadow="always" justify="center">
        <div slot="header" class="clearfix">
          <span class="title-format">Please input your ID to enter reservation center</span>
        </div>
        <el-form ref="dataForm" :model="dataForm" :rules="loginRules" class="demo-form-inline">
          <el-form-item prop="userid">
          <el-input

            id="userid"
            ref="userid"
            v-model="dataForm.userid"
            placeholder="Your ID"
            name="userid"
            type="text"
            tabindex="1"
            autofocus="true"/>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain class="confirm-button" @click="login(dataForm)">Submit</el-button>
            <!-- <el-button type="primary" plain class="confirm-button" @click="exit()">Exit</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>



export default {
  data() {
    return {
      dataForm: {
        userid:''
      },
      loginRules: {
        userid: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // login(dataForm) {
    //   this.$router.push({ path: '/recommend', query: { userId: dataForm.userid }})
    // },
    login(dataForm) {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$router.push({ path: '/recommend', query: { userId: dataForm.userid }})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.title-format{
    font-size: 18px;
    line-height: 28px;
}
.confirm-button{
  width:40%;
  height:12%;
  margin-top: 5%;
  margin-right:3%;
}
.box-card{
  width:40%;
  height:30%;
  margin-top:2%;
  margin-left: 30%;
}
.input-order-container{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}

</style>
