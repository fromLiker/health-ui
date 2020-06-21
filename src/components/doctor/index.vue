<template>
  <div style="text-align:center; padding-top: 30px;">
    <el-tabs class="border-card" v-model="activeName" type="border-card" :tab-position="tabPosition" @tab-click="handleClick">
      <el-tab-pane name="Blood_Test" label="Blood Test"><h3 style="color:green">Blood Test Information</h3></el-tab-pane>
      <el-tab-pane name="Surgical_Department" label="Surgical Department"><h3 style="color:green">Surgical Department Information</h3></el-tab-pane>
      <el-tab-pane name="Internal_Medicine" label="Internal Medicine"><h3 style="color:green">Internal Medicine Information</h3></el-tab-pane>
      <el-carousel :interval="4000" type="card">
        <!-- <el-carousel-item v-for="(value, name) in offinfo" :key="name">
          <h3>{{ name.toUpperCase().replace(/_/g, ' ') }}: {{ value }}</h3>
        </el-carousel-item> -->
        <el-carousel-item v-if="offinfo.id">
          <h3 align="left">Office ID: {{ offinfo.id }}</h3>
          <h3 align="left">Name: {{ offinfo.name }}</h3>
          <h3 align="left">BookedCustomer: {{ offinfo.booked_customer }}</h3>
          <h3 align="left">ConfirmedCustumer: {{ offinfo.confirmed_custumer }}</h3>
          <h3 align="left">WaitingMinutes: {{ offinfo.waiting_minutes }}</h3>
          <!-- <h3 align="left">Status: {{ offinfo.status }}</h3> -->
          <h3 align="left">Address: {{ offinfo.address }}</h3>
        </el-carousel-item>
        <el-carousel-item v-if="offinfo.booked_custs && offinfo.booked_custs.cust_list && offinfo.booked_custs.cust_list.length > 0">
          <h3>Booked ID | Name | Age | Duration</h3>
          <h3 v-for="(item,index) in offinfo.booked_custs.cust_list" :key="index">
            {{ item.id }} | {{ item.name }} | {{ item.age }} | {{ item.exam_duration }}
          </h3>
        </el-carousel-item>
        <el-carousel-item v-if="offinfo.confirmed_custs && offinfo.confirmed_custs.cust_list && offinfo.confirmed_custs.cust_list.length > 0">
          <h3>Confirmed ID | Name | Age | Duration</h3> <h4>  {{offinfo.confirmed_custs.cust_index+1}}  th</h4>
          <h3 v-for="(item,index) in offinfo.confirmed_custs.cust_list" :key="index">
            <span v-if="index==offinfo.confirmed_custs.cust_index">-->&nbsp;</span>
            {{ item.id }} | {{ item.name }} | {{ item.age }}
          </h3>
        </el-carousel-item>
        <el-carousel-item v-if="custinfo.info">
          <h3 align="left" v-if="custinfo.info">INFO: {{ custinfo.info }}</h3>
        </el-carousel-item>
        <el-carousel-item v-if="custinfo.id">
          <h3 align="left" v-if="custinfo.id">Customer ID: {{ custinfo.id }}</h3>
          <h3 align="left" v-if="custinfo.name">Name: {{ custinfo.name }}</h3>
          <h3 align="left" v-if="custinfo.age">Age: {{ custinfo.age }}</h3>
          <h3 align="left" v-if="custinfo.exam_duration">Duration: {{ (custinfo.exam_duration)/60 }} mins</h3>
        </el-carousel-item>
      </el-carousel>
      <el-button type="primary" plain class="confirm-button el-icon-s-claim" @click="accept()"> Accept</el-button>
      <el-button type="primary" plain class="confirm-button el-icon-success" @click="doneExam()"> DoneExam</el-button>
    </el-tabs>
  </div>
</template>

<script>
import { get } from '../../utils/api';

export default {
  data() {
    return {
      tabPosition: 'top',
      activeName: 'Blood_Test',
      offinfo: {},
      custinfo: {}
    };
  },
  created: function() {
    this.handleClick()
  },
  methods: {
    handleClick() {
      this.offinfo = {}
      this.custinfo= {}
      get('/office/' + this.activeName + '/').then((res) => {
        console.log(res)
        this.offinfo = { ...res }
      });
    },
    accept() {
      this.offinfo = {}
      this.custinfo= {}
      get('/office/' + this.activeName + '/accept').then((res) => {
        console.log(res)
        this.custinfo = { ...res }
      });
    },
    doneExam() {
      this.offinfo = {}
      this.custinfo= {}
      get('/office/' + this.activeName + '/doneExam').then((res) => {
        console.log(res)
        this.custinfo = { ...res }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-button {
  width: 40%;
  height: 12%;
  margin-top: 5%;
  margin-right: 3%;
  opacity: 0.5;
}
.border-card {
  width: 70%;
  height: 100%;
  margin-top: 2%;
  margin-left: 15%;
  background: rgba(0, 0, 0, 0.4);
}
.el-carousel__item h3 {
  color: black;
  vertical-align: middle;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
