<template>
  <div>
    <el-table
      v-loading="loading"
      :data="moneyList"
      >
      <el-table-column
        type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="nameEn"
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
        prop="interestStr"
        label="累计锁仓收益"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
       >
        <template slot-scope="scope">
          <!--<router-link class="mvc-btn mvc-btn-primary" :to="{path: '/myMoney/moneyRecharge', query: {type:type,id:1}}">充值</router-link>-->
          <router-link v-show="withdrawData&&withdrawData.data&&withdrawData.data[1].switchKey === 1" class="mvc-btn mvc-btn-success" :to="{path: '/myMoney/moneyWithdraw', query: {type:type,balance:scope.row.balanceStr,id:2}}">提现</router-link>
          <router-link class="mvc-btn mvc-btn-danger" :to="{path: '/myMoney/moneyLock', query: {type:type,id:3,balance:scope.row.balanceStr,lock:scope.row.lockStr}}">锁仓</router-link>
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
      this.getWithDraw()
    },
    methods: {
      getMoneyList() {
        this.loading = true
        this.$store.dispatch('getMoneyList').then(() => {
          this.loading = false
        }).catch((err) => {
          this.$message.error(err)
          this.loading = false
        })
      },
      getWithDraw() {
        this.$store.dispatch('getWithdrawRule').then((res) => {
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },

    computed: {
      ...mapGetters({
        withdrawData: 'withdrawData',
        moneyList: 'moneyList'
      })
    },
    data() {
      return {
        loading: false,
        type: window.urlData.type
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
