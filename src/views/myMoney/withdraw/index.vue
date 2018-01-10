<template>
  <div class="withdraw-con">
    <div class="withdraw-row">
      <el-form label-width="130px" class="demo-ruleForm">
        <el-form-item label="可用余额：" prop="pass">
          <span>10000ETH</span>
        </el-form-item>
        <el-form-item label="单日提现上限：" prop="checkPass">
          <span>10000ETH</span>
        </el-form-item>
        <el-form-item label="提现地址：" prop="age">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="age">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="age">
          <el-col :span="19">
            <el-input></el-input>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <el-button>获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="" prop="age">
          <el-button type="primary">
            确认提现
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p class="withdraw-title">最近提现记录</p>
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
    name: 'withdraw',
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
