<template>
  <div class="change-pwd">
    <div class="change-pwd-con">
      <h1 class="change-pwd-title">修改密码</h1>
      <el-form :label-position="labelPosition" label-width="120px" :model="changeFrom" :rules="changeRules"
               ref="changeFrom">
        <el-form-item prop="password" label="旧密码：">
          <el-input type="password" v-model="changeFrom.password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码：">
          <el-input type="password" v-model="changeFrom.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="againPwd" label="再次输入：">
          <el-input type="password" v-model="changeFrom.againPwd" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="goChange(changeFrom)">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { passwordVerification } from '@/utils/validate'

  export default {
    name: 'changePwd',
    data() {
      const validateOldPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入旧密码'))
        } else {
          callback()
        }
      }
      const validateNewPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入旧密码'))
        } else {
          if (!passwordVerification(value)) {
            callback(new Error('密码格式不匹配，最少6位且必须包含英文和数字'))
          } else {
            callback()
          }
        }
      }
      const validateAgainPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'))
        } else {
          if (value !== this.changeFrom.newPassword) {
            callback(new Error('两次密码不一致'))
          } else {
            callback()
          }
        }
      }
      return {
        loading: false,
        labelPosition: 'right',
        changeFrom: {
          password: '',
          newPassword: '',
          againPwd: ''
        },
        changeRules: {
          password: [{ required: true, trigger: 'blur', validator: validateOldPwd }],
          newPassword: [{ required: true, trigger: 'blur', validator: validateNewPwd }],
          againPwd: [{ required: true, trigger: 'blur', validator: validateAgainPwd }]
        }
      }
    },
    methods: {
      goChange() {
        this.$refs.changeFrom.validate((valid) => {
          if (valid) {
            this.$store.dispatch('changePwd', this.changeFrom).then(() => {
              this.$refs['changeFrom'].resetFields()
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            this.loading = false
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
