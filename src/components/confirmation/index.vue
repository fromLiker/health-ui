<template>
  <div class="confirmation-container">
    <div style="text-align:center;">
      <div style="padding-top: 120px;"></div>
      <el-card class="box-card" body-style shadow="always" justify="center">
        <br>
        <div class="text item">
          <h2>Please confirm your choice: </h2>

          {{confirm_office}}
          <br>
          {{confirm_people}}
          <br>
          {{confirm_time}}

        </div>
        <br>
        <el-button type="primary" plain class="confirm-button"  @click="confirm()" v-loading.fullscreen.lock="fullscreenLoading"> Confirm</el-button>
        <el-button type="primary" plain class="confirm-button"  @click="cancel()" v-loading.fullscreen.lock="fullscreenLoading"> Cancel</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/api';

export default {
  data() {
    return {
      confirm_office: '',
      confirm_people: '',
      confirm_time: '',
      fullscreenLoading: false,
    };
  },
  created(){
    var wait_time = this.$route.query.waittime;
    var current_office = this.$route.query.office;
    var wait_people = this.$route.query.people;
    console.log('message: wait time:',wait_time+ ',current office:' + current_office+ ', wait people:' + wait_people);
    this.confirm_office = 'Office:'+ current_office ;
    this.confirm_people = 'There are '+wait_people+' people in line in front of you ';
    this.confirm_time = 'Estimated waiting time is '+ wait_time+ ' minute(s).';

  },
  methods: {
    confirm() {
      this.fullscreenLoading = true;
      var user_id = this.$route.query.userid;
      var office_id = this.$route.query.officeid;
      get('/cust/confirm/'+ user_id+'?office_id='+office_id).then((res) => {
        this.fullscreenLoading = false;
        console.log("后台返回值：",res);
        if(res != null){
          console.log("----------------------------------current office id:",office_id)
          // alert("We have received your confirmation, thanks!")
          for( let i=0; i< res.length; i++){
            if (office_id == ((res[i].id).split('_')[1])){
              let addr = res[i].address;
              console.log("~~~~~~~~~~~~~~~~~~~~~~~current office id:",office_id)
              console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~current address:",addr)
              this.$router.push({ path: '/address', query:{address: addr}});
            }
          }
        }
      })
      this.fullscreenLoading = false;
    },
    cancel(){
      this.fullscreenLoading = true;
      var user_id = this.$route.query.userid;
      this.$router.push({ path: '/recommend',query: { userId: user_id }});
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
