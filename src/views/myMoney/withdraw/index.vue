<template>
  <div class="withdraw-con">
    <div class="withdraw-row">
      <el-form label-width="130px" :rules="fromRules" :model="withFrom" ref="withFrom">
        <el-form-item label="可用余额：" >
          <span>{{$route.query.balance}}</span>
        </el-form-item>
        <el-form-item label="单日提现上限：">
          <span>{{rules.max}}</span>
        </el-form-item>
        <el-form-item label="提现地址：" prop="address">
          <el-input v-model="withFrom.address" placeholder="请输入提现地址"></el-input>
        </el-form-item>
        <el-form-item label="提现金额：" prop="value">
          <el-input v-model="withFrom.value" placeholder="请输入提现金额"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="withFrom.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="valiCode">
          <el-col :span="19">
            <el-input v-model="withFrom.valiCode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="5" style="text-align: right">
            <send-btn :phone="phone"></send-btn>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="subMit" v-loading="loading">
            确认提现
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p class="withdraw-title">最近提现记录</p>
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
          prop="toAddress"
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
  import { mapGetters } from 'vuex'
  import { balanceVerification, isAddress } from '@/utils/validate'
  import sendBtn from '../../../components/sendVerificationCode/index'
  import MD5 from 'md5'
  export default {
    name: 'withdraw',
    computed: {
      ...mapGetters({
        withdrawData: 'withdrawData',
        recordList: 'recordList'
      })
    },
    components: {
      'send-btn': sendBtn
    },
    mounted() {
      this.getWithDraw()
      this.getRecord()
    },
    methods: {
      handleCurrentChange(v) {
        this.pageNo = v
        this.getRecord()
      },
      getWithDraw() {
        this.$store.dispatch('getWithdrawRule').then((res) => {
          res.data.forEach((v,k) => {
            if (v.type === 0) {
              let arr = JSON.parse(v.config.substring(1,v.config.length-1))
              this.rules = arr
            }
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      getRecord() {
        this.$store.dispatch('getRecord', `?pageNo=${this.pageNo}&pageSize=${this.pageSize}&types=1,2`).then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      subMit() {
        this.$refs.withFrom.validate((valid) => {
          if (valid) {
            this.loading = true
            let copyForm = JSON.stringify(this.withFrom)
            copyForm = JSON.parse(copyForm)
            copyForm.password = new MD5().update(copyForm.password).digest('hex')
            this.$store.dispatch('getWithdrawHandler', copyForm).then((res) => {
              this.$message.success('提现申请提交成功')
              this.$refs.withFrom.resetFields();
              this.getRecord()
               this.loading = false
            }).catch((err) => {
              this.$message.error(err)
               this.loading = false
            })
          } else {
            this.$message.error('请完成表单填写')
            return false;
          }
        });
      }
    },
    data() {
      const valiAddress = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入地址'))
        } else {
          if (isAddress(value)) {
            callback()
          } else {
            callback(new Error('请输入有效地址'))
          }
        }
      }
      const valiValue = (rule, value, callback) => {
        let _balance = this.$route.query.balance
        if (!Number(value)) {
          callback(new Error('请输入数量'))
        } else {
          if(!balanceVerification(value)) {
            callback(new Error('请输入正确数字'))
          } else {
            if( value>parseFloat(_balance)) {
              callback(new Error('提现数量不能大于可用余额'))
            } else {
              callback()
            }
          }
        }
      }
      const valiCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      const valiPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        rules: {},
        loading: false,
        pageNo: 1,
        pageSize: 10,
        phone: JSON.parse(window.sessionStorage.getItem('mvcUser')).cellphone,
        withFrom: {
          address: '',
          value: '',
          valiCode: '',
          type: this.$route.query.type,
          password: ''
        },
        fromRules: {
          address:  [{ required: true, trigger: 'blur', validator: valiAddress }],
          value: [{ required: true, trigger: 'blur', validator: valiValue }],
          valiCode: [{ required: true, trigger: 'blur', validator: valiCode }],
          password: [{ required: true, trigger: 'blur', validator: valiPassword }]
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
