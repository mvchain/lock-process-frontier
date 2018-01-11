<template>
  <div class="lock-con">
    <div class="lock-title" style="margin-top:0;color:rgb(255, 208, 75)">锁仓规则：锁仓6个月，利息10%，代币锁仓后，在锁仓时间截至前，无法提现</div>
    <div class="lock-row">
      <el-form label-width="130px" :model="lockForm" :rules="lockRules" ref="lockForm">
        <el-form-item label="已锁仓金额：">
          <span>{{$route.query.lock}}</span>
        </el-form-item>
        <el-form-item label="可锁仓金额：">
          <span>{{$route.query.balance}}</span>
        </el-form-item>
        <el-form-item label="锁仓金额：" prop="value">
          <el-input v-model="lockForm.value" placeholder="请输入锁仓金额"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="lockForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="age">
          <el-button type="primary" @click="subMit">
            确认锁仓
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
  import { balanceVerification } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  export default {
    name: 'lockWarehouse',
    computed: {
      ...mapGetters({
        recordList: 'recordList'
      })
    },
    data() {
      const valiPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      const valiValue = (rule, value, callback) => {
        let _balance = this.$route.query.balance
        if (!value) {
          callback(new Error('请输入数量'))
        } else {
          if(!balanceVerification(value)) {
            callback(new Error('请输入正确数字'))
          } else {
            if( value>parseFloat(_balance)) {
              callback(new Error('锁仓金额不能大于可锁仓金额'))
            } else {
              callback()
            }
          }
        }
      }
      return {
        lockForm: {
          address: '',
          password: '',
          value: '',
          type: this.$route.query.type
        },
        lockRules: {
          value: [{ required: true, trigger: 'blur', validator: valiValue }],
          password: [{ required: true, trigger: 'blur', validator: valiPassword }]
        }
      }
    },
    methods: {
      getRecord() {
        this.$store.dispatch('getLockRecord', `?pageNo=${this.pageNo}&pageSize=${this.pageSize}&types=1,2`).then(() => {
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      subMit() {
        this.$refs.lockForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('getLockPosition', this.lockForm).then((res) => {
              this.$message.success('锁仓申请提交成功')
              this.$refs.lockForm.resetFields();
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            this.$message.error('请完成表单填写')
            return false;
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
