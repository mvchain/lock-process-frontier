<template>
  <div>
    <el-table
      :data="moneyList"
      >
      <el-table-column
        type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="币种"
        >
      </el-table-column>
      <el-table-column
        prop="balanceStr"
        label="余额"
        >
      </el-table-column>
      <el-table-column
        prop="lockStr"
        label="锁仓金额"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
       >
        <template slot-scope="scope">
          <router-link class="mvc-btn mvc-btn-primary" :to="{path: '/myMoney/moneyRecharge', query: {id:scope.row.id}}">充值</router-link>
          <router-link class="mvc-btn mvc-btn-success" :to="{path: '/myMoney/moneyWithdraw', query: {id:scope.row.id}}">提现</router-link>
          <router-link class="mvc-btn mvc-btn-danger" :to="{path: '/myMoney/moneyLock', query: {id:scope.row.id}}">锁仓</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'moneyIndex',
    mounted() {
      this.getMoneyList()
    },
    methods: {
      getMoneyList() {
        this.$store.dispatch('getMoneyList').then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
    computed: {
      ...mapGetters({
        moneyList: 'moneyList'
      })
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
