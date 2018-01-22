<template>
  <div>
    <el-table
      :data="lockRecordList.list"
      v-loading="loading"
    >
      <el-table-column
        prop="orderId"
        label="单号"
      >
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="时间"
      >
      </el-table-column>
      <el-table-column
        prop="quantityStr"
        label="锁仓金额">
      </el-table-column>
      <el-table-column
        prop="interestStr"
        label="锁仓收益">
      </el-table-column>
      <el-table-column
        label="利率">
        <template slot-scope="scope">
          <span>{{(scope.row.interestRate*100) + '%'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="month"
        label="锁仓时长">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="解锁日期时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status==0?'锁仓中':'已解锁'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-style">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="lockRecordList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'lockRecored',
    computed: {
      ...mapGetters({
        lockRecordList: 'lockRecordList'
      })
    },
    mounted() {
      this.getRecord()
    },
    methods: {
      getRecord() {
        this.loading = true
        this.$store.dispatch('getLockRecord', `?pageNo=${this.pageNo}&pageSize=${this.pageSize}`).then(() => {
          this.loading = false
        }).catch((err) => {
          this.$message.error(err)
          this.loading = false
        })
      },
      handleCurrentChange() {
        this.getRecord()
      }
    },
    data() {
      return {
        loading: false,
        pageNo: 1,
        pageSize: 10
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
