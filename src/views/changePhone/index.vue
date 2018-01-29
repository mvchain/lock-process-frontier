<template>
  <div class="change-phone">
    <div class="change-phone-con">
      <h1 class="change-phone-title">修改手机</h1>
      <el-form :label-position="labelPosition" label-width="120px" :model="phoneFrom" :rules="phoneRules"
               ref="phoneFrom">
        <el-form-item prop="password" label="密码：">
          <el-input type="password" v-model="phoneFrom.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="newCellPhone" label="绑定手机：">
          <el-input v-model="phoneFrom.newCellPhone" placeholder="请输入想要绑定的手机"></el-input>
        </el-form-item>
        <el-form-item prop="valiCode" label="验证码：">
          <el-col :span="16">
            <el-input v-model="phoneFrom.valiCode" :disabled="verTime" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8" style="text-align: right">
            <send-btn :phone="phone"></send-btn>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePhone" v-loading="loading">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { phoneNumFilter } from '@/utils/validate'
  import sendBtn from '../../components/sendVerificationCode/index'
  import md5 from 'blueimp-md5'
  export default {
    name: 'changePhone',
    components: {
      'send-btn': sendBtn
    },
    data() {
      const validatePwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入想要绑定的手机'))
        } else {
          if (!phoneNumFilter(value)) {
            callback(new Error('请输入有效手机号码'))
          } else {
            callback()
          }
        }
      }
      const validateCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      return {
        labelPosition: 'right',
        verTime: false,
        loading: false,
        phone: JSON.parse(window.sessionStorage.getItem('mvcUser')).cellphone,
        phoneFrom: {
          password: '',
          newCellPhone: '',
          valiCode: ''
        },
        phoneRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePwd }],
          newCellPhone: [{ required: true, trigger: 'blur', validator: validatePhone }],
          valiCode: [{ required: true, trigger: 'blur', validator: validateCode }]
        }
      }
    },
    methods: {
      changePhone() {
        this.$refs.phoneFrom.validate((valid) => {
          if (valid) {
            this.loading = true
            let copyForm = JSON.stringify(this.phoneFrom)
            copyForm = JSON.parse(copyForm)
            copyForm.password = md5(md5(copyForm.password) + 'MVC')
            this.$store.dispatch('changePhone', copyForm).then(() => {
              this.$refs['phoneFrom'].resetFields()
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.loading = false
              window.sessionStorage.clear()
              this.$router.replace('/login')
            }).catch((err) => {
              this.loading = false
              this.$message.error(err)
            })
          } else {
            this.$message.error('请正确填写信息')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
