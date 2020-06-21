<template>
  <div class="completed-container">
    <div style="text-align:center;">
      <h1 style="padding-top: 120px;">This is what you have finished:</h1>
      <el-card class="box-card" shadow="always" justify="center">
        <el-checkbox v-for="department in departments" :label="department" :key="department" checked disabled>{{department}}</el-checkbox>
        <br>
        <el-button type="primary" plain class="confirm-button" @click="close()">Close</el-button>

      </el-card>
    </div>
  </div>
</template>

<script>
  const departmentOptions = ['empty stomach', 'holding back urine', 'prepare for pregnancy'];
  export default {
    data() {
      return {
        departments: departmentOptions,
        isIndeterminate: true
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedDepartments = val ? departmentOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedDepartmentsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.departments.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.departments.length;
      }
    }
  };
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
