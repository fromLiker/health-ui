<template>
  <div class="confirmation-container">
    <div style="text-align:center;">
      <div style="padding-top: 120px;"></div>
      <el-card class="box-card" body-style shadow="always" justify="center">
        <br>
        <div class="text item">
          <h2>You can refer the address info to go to your office: </h2>
          
          {{address_msg}}

        </div>
        <br>
        <el-button type="primary" plain class="confirm-button"  @click="close()" v-loading.fullscreen.lock="fullscreenLoading"> Close</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      address_msg: '',
      fullscreenLoading: false,
    };
  },
  created(){ 
    var current_address = this.$route.query.address;
    console.log('address:',current_address);
    this.address_msg = 'Your current office address:'+ current_address ;
  },
  methods: {
    close(){
      this.fullscreenLoading = true;
      this.$router.push({ path: '/login'});
    }
  },
};
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
  // opacity: 0.5;
}
.input-order-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
