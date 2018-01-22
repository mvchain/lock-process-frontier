<template>
  <div class="recharge-con">
    <div class="recharge-address">
      充值地址：{{address}}
    </div>
    <div class="recharge-qr">
      <p>或扫描地址二维码</p>
      <div>
        <img :src="qrImg" alt="地址二维码">
      </div>
    </div>
    <div class="recharge-title">
      <p>最近充值记录</p>
      <el-table
        v-loading="loading"
        :data="recordList.list"
        style="width: 100%">
        <el-table-column
          prop="orderId"
          label="单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="quantityStr"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="fromAddress"
          label="转账ID">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span type="text">{{scope.row.status==0?'等待':'完成'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-style">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="recordList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import { mapGetters } from 'vuex'
  export default {
    name: 'recharge',
    mounted() {
      this.getAddress()
      this.getRecord()
    },
    methods: {
      handleCurrentChange(v) {
        this.pageNo = v
        this.getRecord()
      },
      getAddress() {
        this.$store.dispatch('getAddress').then((res) => {
          this.address = res
          this.getQRCode(res)
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      getQRCode(v) {
        QRCode.toDataURL(v)
          .then(url => {
            this.qrImg = url
          })
          .catch(err => {
            this.$message.error(err)
          })
      },
      getRecord() {
        this.loading = true
        this.$store.dispatch('getRecord', `?pageNo=${this.pageNo}&pageSize=${this.pageSize}&types=0`).then(() => {
          this.loading = false
        }).catch((err) => {
          this.$message.error(err)
          this.loading = false
        })
      }
    },
    computed: {
      ...mapGetters({
        recordList: 'recordList'
      })
    },
    data() {
      return {
        address: '',
        loading: false,
        qrImg: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
