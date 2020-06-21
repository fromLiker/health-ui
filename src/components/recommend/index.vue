<template>
  <div class="login-container">
    <div style="text-align:center;">
      <el-card class="box-card" shadow="always" justify="center">
        <div slot="header" class="clearfix">
          <span>
            The system selects
            <el-button type="primary" @click="toggleSelection([tableData[0]])">Smart Recommendation</el-button>
            by default
          </span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="directCompleteProject"
          >Compeleted Item</el-button>
        </div>
        <el-table
          v-loading.fullscreen.lock="fullscreenLoading"
          ref="multipleTable"
          :data="tableData"
          :show-header="false"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="name" label="item" width="150">
            <template slot-scope="scope">{{ scope.row.name }}item</template>
          </el-table-column>
          <el-table-column prop="confirmed_custumer" label="number" width="200">
            <template
              slot-scope="scope"
            >There are {{ scope.row.confirmed_custumer }} people in line in front of you</template>
          </el-table-column>
          <el-table-column prop="waiting_minutes" label="time" width="270">
            <template
              slot-scope="scope"
            >Estimated waiting time is {{ scope.row.waiting_minutes }} minutes</template>
          </el-table-column>
        </el-table>
        <br />
        <div style="text-align: right">
          <el-button
            type="primary"
            @click="submitSelect()"
            v-loading.fullscreen.lock="fullscreenLoading"
          >Submit</el-button>
          <el-button @click="toggleSelection()">Cancel</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
// import { getQueue } from './getQueue'
import { get } from '../../utils/api'

export default {
  data() {
    return {
      tableData: [],
      multipleTable: [], //存放选中值的数组
      office_id: '',
      fullscreenLoading: false
    }
  },
  created() {
    this.fullscreenLoading = true
    var param = this.$route.query.userId

    get('/cust/offices?user_id=' + param).then(res => {
      // if (res.status === 200) {
      console.log(res)
      this.tableData = res
      this.$nextTick(function() {
        this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
      })
      this.fullscreenLoading = false
      // alert('Success!!')
      // } else {
      //   this.$router.push({ path: '/login'})
      //   alert('Error!!')
      // }
    })

    // getQueue(param).then(response => {
    //   if (response.status === 200) {
    //     console.log(response.data)
    //     this.tableData = response.data
    //     this.$nextTick(function() {
    //       this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    //     })
    //     // alert('Success!!')
    //   } else {
    //     this.$router.push({ path: '/login'})
    //     alert('Error!!')
    //   }
    // });
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(val.pop())
      } else {
        this.multipleTable = val
        // alert(val);              //  this.multipleTable 选中的值
        console.log('选中的值：', val)
        if (val.length > 0) {
          var currentId = val[0].id.split('_')[1]
          console.log('id值：', currentId)
        }
        this.office_id = currentId
      }
    },
    submitSelect() {
      this.fullscreenLoading = true
      var param_userid = this.$route.query.userId
      get('/cust/book/' + param_userid + '?office_id=' + this.office_id).then(
        res => {
          console.log('后台返回值：', res)
          if (res != null) {
            this.fullscreenLoading = false
            for (let i = 0; i < res.length; i++) {
              if (this.office_id == res[i].id.split('_')[1]) {
                console.log("res[i].id~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",res[i].id)
                var waittime = res[i].waiting_minutes
                var officename = res[i].name
                var waitpeople = res[i].confirmed_custumer
                var officeid = res[i].id.split('_')[1]
              }
            }
          } else {
            alert('Error Occur! You will be redirect to the first page!')
          }
          // this.$router.push({ path: '/confirmation', query: { userid: param_userid , info: res }})
          this.$router.push({
            path: '/confirmation',
            query: {
              userid: param_userid,
              waittime: waittime,
              office: officename,
              officeid: officeid,
              people: waitpeople
            }
          })
          this.fullscreenLoading = false
        }
      )
    },
    directCompleteProject() {
      var param_userid = this.$route.query.userId
      console.log('recommend page', param_userid)
      this.$router.push({
        path: '/completedProject',
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
  width: 50%;
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
