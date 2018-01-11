<template>
  <el-button @click="getVerificationCode" :disabled="verTime">{{verificationTxt}}</el-button>
</template>

<script>
  export default {
    name: 'sendCode',
    props: {
      phone: String
    },
    data() {
      return {
        verTime: false,
        verificationTxt: '获取验证码'
      }
    },
    methods: {
      getVerificationCode() {
        const that = this
        that.verTime = true

        let n = 59
        let time = null
        this.$store.dispatch('getVali', { mobile: this.phone }).then((res) => {
          this.$message({
            type: 'success',
            message: '发送成功'
          })
        }).catch((err) => {
          this.$message.error(err)
        })
        time = setInterval(() => {
          that.verificationTxt = n + '秒后再试'
          if (n <= 0) {
            clearInterval(time)
            that.verTime = false
            that.verificationTxt = '获取验证码'
          } else {
            n--
          }
        }, 1000)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
