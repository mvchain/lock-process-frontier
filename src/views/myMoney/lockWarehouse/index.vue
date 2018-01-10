<template>
  <div class="lock-con">
    <div class="lock-title" style="margin-top:0;color:rgb(255, 208, 75)">锁仓规则：锁仓6个月，利息10%</div>
    <div class="lock-row">
      <el-form label-width="130px" >
        <el-form-item label="已锁仓金额：">
          <span>10000ETH</span>
        </el-form-item>
        <el-form-item label="可锁仓金额：">
          <span>10000ETH</span>
        </el-form-item>
        <el-form-item label="锁仓金额：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="" prop="age">
          <el-button type="primary">
            确认提现
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p class="lock-title">最近锁仓记录</p>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lockWarehouse',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
