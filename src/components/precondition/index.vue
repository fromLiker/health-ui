<template>

  <div class="precondition-container">
    <div style="text-align:center;">
      <h1 style="padding-top: 120px;">Please let us know your preconditions:</h1>
      <el-card class="box-card" shadow="always" justify="center">
        <el-checkbox style="padding-right:76%" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">select all</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedDepartments" @change="handleCheckedDepartmentsChange">
          <el-checkbox v-for="department in departments" :label="department" :key="department">{{department}}</el-checkbox>
        </el-checkbox-group>
        <el-button  type="primary" plain class="confirm-button" @click="login()">Confirm</el-button>
        <el-button  type="primary" plain class="confirm-button" @click="exit()">Cancel</el-button>

      </el-card>
    </div>
  </div>
</template>

<script>
  const departmentOptions = ['empty stomach', 'holding back urine', 'prepare for pregnancy'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedDepartments: ['empty stomach'],
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
