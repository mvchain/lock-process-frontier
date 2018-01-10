<template>
  <div class="clear-con">
    <div class="clear-title" style="margin-top:0;">领币说明：清退领币申请每个账户只能提交一次申请，请认真填写，以免给您造成不必要的麻烦！
      TxHash 最多能填写两个。如有特殊情况请在备注中说明。</div>
    <div class="clear-row">
      <el-form label-width="130px">
        <el-form-item label="姓名：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="清退MVC数量：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          label="备注：">
          <el-input type="textarea"
                    :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="" prop="age">
          <el-button type="primary">
            提交申请
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p class="clear -title">最近锁仓记录</p>
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
    name: 'clearMoney',
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
