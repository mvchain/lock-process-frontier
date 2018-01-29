<template>
  <div class="lock-con">
    <div v-if="rules.month" class="lock-title" style="margin-top:0;color:rgb(255, 208, 75)">锁仓规则：锁仓{{rules.month}}个月，利息{{rules.interest*100}}%，代币锁仓后，在锁仓时间截止前，无法提现</div>
    <div class="lock-row">
      <el-form label-width="130px" :model="lockForm" :rules="lockRules" ref="lockForm">
        <el-form-item label="已锁仓金额：">
          <span>{{$route.query.lock}}</span>
        </el-form-item>
        <el-form-item label="可锁仓金额：">
          <span>{{rules.max-$route.query.lock}}</span>
        </el-form-item>
        <el-form-item label="锁仓金额：" prop="value">
          <el-input v-model="lockForm.value" placeholder="请输入锁仓金额"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="lockForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="age">
          <el-button type="primary" @click="subMit" v-loading="loading">
            确认锁仓
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <lock-recored></lock-recored>
  </div>
</template>

<script>
  import { balanceVerification } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import lockRecored from '../../../components/lockRecored/index'
  import MD5 from 'md5'
  export default {
    name: 'lockWarehouse',
    computed: {
      ...mapGetters({
        withdrawData: 'withdrawData'
      })
    },
    components: {
      'lock-recored': lockRecored
    },
    mounted() {
      this.getWithDraw()
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
        rules: {},
        loading: false,
        lockForm: {
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
      getWithDraw() {
        this.$store.dispatch('getWithdrawRule').then((res) => {
          res.data.forEach((v,k) => {
            if (v.type === 1) {
              let arr = JSON.parse(v.config.substring(1, v.config.length - 1))
              this.rules = arr
            }
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      },
      subMit() {
        this.$refs.lockForm.validate((valid) => {
          if (valid) {
            this.loading = true
            let copyForm = JSON.stringify(this.lockForm)
            copyForm = JSON.parse(copyForm)
            copyForm.password = new MD5().update(copyForm.password).digest('hex')
            this.$store.dispatch('getLockPosition', copyForm).then((res) => {
              this.$message.success('锁仓申请提交成功')
              this.$refs.lockForm.resetFields()
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
