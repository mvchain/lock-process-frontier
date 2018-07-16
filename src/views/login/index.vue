<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="../../../static/imgs/logo.png" alt="">
    </div>
    <div class="gonggao">原housebtc.com平台用户的手机号和密码不变</div>
    <el-form v-show="showFlag.loginFlag" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title">登 录</h3>
      <el-form-item prop="cellphone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="cellphone" type="text" v-model="loginForm.cellphone" autoComplete="on" placeholder="手机号"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item prop="valiCode">
        <el-row class="verification-con">
          <el-col :span="18" class="verification-e">
            <el-input v-model="loginForm.valiCode"></el-input>
          </el-col>
          <el-col :span="6" class="verification-s">
            <span @click="changeVerification">
              <img :src="verificationImg" alt="">
            </span>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="registered">
        <div>
          <el-button @click="changFlag('forgetFlag')" type="text">忘记密码？</el-button>
        </div>
        <div>
          <el-button size="small" type="info" @click="changFlag('registeredFlag')">注 册</el-button>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" style="width:100%;" v-loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-form v-show="showFlag.registeredFlag" autoComplete="on" :model="loginForm1" :rules="loginRules" ref="loginForm1"
             label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title" >注 册</h3>
      <el-form-item prop="cellphone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="cellphone" type="text" v-model="loginForm1.cellphone" autoComplete="on" placeholder="手机号"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="loginForm1.password" autoComplete="on"
                  placeholder="登录密码,至少6位，非纯数字或纯字母"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item prop="passwordAgain">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="loginForm1.passwordAgain" autoComplete="on"
                  placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="valiCode">
        <el-row class="verification-con">
          <el-col :span="15" class="verification-e">
            <el-input v-model="loginForm1.valiCode"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button type="info" class="verificationBtn" :disabled="verTime" @click="getVerificationCode('z', loginForm1.cellphone)">
              {{verificationTxt}}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" v-loading="loading"
                   @click.native.prevent="handleRegistered('loginFlag')">
          立即注册
        </el-button>
      </el-form-item>
    </el-form>
    <el-form v-show="showFlag.forgetFlag" autoComplete="on" :model="forgetForm" :rules="loginRules" ref="forgetForm"
             label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title">忘记密码</h3>
      <el-form-item prop="cellphone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="cellphone" type="text" v-model="forgetForm.cellphone" autoComplete="on" placeholder="手机号"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="forgetForm.password" autoComplete="on"
                  placeholder="输入新密码"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item prop="againPwd">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" v-model="forgetForm.againPwd" autoComplete="on"
                  placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="vateCode">
        <el-row class="verification-con">
          <el-col :span="15" class="verification-e">
            <el-input v-model="forgetForm.valiCode"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button type="info" class="verificationBtn" :disabled="verTime" @click="getVerificationCode('f', forgetForm.cellphone)">
              {{verificationTxt}}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" v-loading="loading"
                   @click.native.prevent="handleForget('loginFlag')">
          确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { phoneNumFilter, passwordVerification } from '@/utils/validate'
  import { setToken } from '@/utils/auth'
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!phoneNumFilter(value)) {
          callback(new Error('请输入正确手机号'))
        } else {
          callback()
        }
      }
      const regPassword = (rule, value, callback) => {
        if (!passwordVerification(value)) {
          callback(new Error('密码格式不匹配，最少6位且必须包含英文和数字'))
        } else {
          callback()
        }
      }
      const passwordAgain = (rule, value, callback) => {
        if (value !== this.loginForm1.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      const forgetPasswordAgain = (rule, value, callback) => {
        if (value !== this.forgetForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        verificationTxt: '获取验证码',
        verTime: false,
        showFlag: {
          loginFlag: true,
          registeredFlag: false,
          forgetFlag: false
        },
        loginForm: {
          cellphone: '',
          password: '',
          valiCode: ''
        },
        loginForm1: {
          cellphone: '',
          password: '',
          passwordAgain: '',
          valiCode: ''
        },
        forgetForm: {
          cellphone: '',
          valiCode: '',
          password: '',
          againPwd: ''
        },
        loginRules: {
          cellphone: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: regPassword }],
          passwordAgain: [{ required: true, trigger: 'blur', validator: passwordAgain }],
          valiCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
          againPwd: [{ required: true, trigger: 'blur', validator: forgetPasswordAgain }]
        },
        loading: false,
        pwdType: 'password',
        verificationImg: ''
      }
    },
    mounted() {
      this.createCode()
    },
    methods: {
      createCode() {
        this.verificationImg = window.urlData.url + '/auth/client/validate/image?t=' + Date.parse(new Date())
      },
      changeVerification() {
        this.createCode()
      },
      getVerificationCode(v, phone) {
        if (v === 'z') {
          if (!this.loginForm1.cellphone) {
            this.$message.error('请先填写手机号')
            return
          }
        }
        if (v === 'f') {
          if (!this.forgetForm.cellphone) {
            this.$message.error('请先填写手机号')
            return
          }
        }
        const that = this
        that.verTime = true
        let n = 59
        let time = null
        this.$store.dispatch('getVali', { mobile: phone }).then((res) => {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
        }).catch((err) => {
          this.$message.error(err)
        })
        time = setInterval(() => {
          that.verificationTxt = n
          if (n <= 0) {
            clearInterval(time)
            that.verTime = false
            that.verificationTxt = '获取验证码'
          } else {
            n--
          }
        }, 1000)
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then((res) => {
              setToken(JSON.stringify({ cellphone: this.loginForm.cellphone, token: res }))
              this.$router.push({ path: '/' })
              this.loading = false
            }).catch((err) => {
              this.$message.error(err)
              this.loading = false
            })
          } else {
            this.loading = false
            this.$message.error('请正确填写信息')
            return false
          }
        })
      },
      changFlag(v) {
        const that = this
        Object.keys(this.showFlag).forEach(key => {
          if (v === key) {
            that.showFlag[v] = true
          } else {
            that.showFlag[key] = false
          }
        })
      },
      handleRegistered() {
        this.$refs.loginForm1.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('setRegistered', this.loginForm1).then(() => {
              this.changFlag('loginFlag')
              this.$message({
                type: 'success',
                message: '注册成功'
              })
              this.loading = false
              this.$refs['loginForm1'].resetFields()
            }).catch((err) => {
              this.loading = false
              this.$message.error(err)
            })
          } else {
            this.loading = false
            this.$message.error('请正确填写信息')
            return false
          }
        })
      },
      handleForget() {
        this.$refs.forgetForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('setForgetPwd', this.forgetForm).then(() => {
              this.changFlag('loginFlag')
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.loading = false
              this.$refs['forgetForm'].resetFields()
            }).catch((err) => {
              this.$message.error(err)
              this.loading = false
            })
          } else {
            this.$message.error('请正确填写信息')
            this.loading = false
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .gonggao{
    text-align: center;
    font-size:20px;
    font-weight:900;
    color:#fff;
    padding-top:20px;
  }
  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .verification-con {
      & .verification-s {
        text-align: center;
        cursor: pointer;
        border-radius: 0 3px 3px 0;
        & img{
          position: relative;
          top:8px;
        }
      }
    }
    .registered {
      display: flex;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
      margin-bottom: 20px;

      & > div:first-child span {
        color: #fff;
        cursor: pointer;
      }
    }
    .getCode {
      padding: 16px 26px;
      border-radius: 0 3px 3px 0;
    }
    .verificationBtn {
      width: 124px;
      height: 47px;
      padding: 0;
      border-radius: 0 3px 3px 0;
    }
    .back-login{
      position: absolute;
      left:35px;
    }
    .login-logo img{
      position: absolute;
      width:100px;
      margin:30px 0 0 30px;
    }
  }
</style>
