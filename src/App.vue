<template>
  <div id="app">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">Get Your ID</el-menu-item>
      <!-- <el-menu-item index="/precondition">自我筛查</el-menu-item> -->
      <el-menu-item index="/login">Reservation Center</el-menu-item>
      <el-menu-item index="/doctor">Doctor Center</el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
