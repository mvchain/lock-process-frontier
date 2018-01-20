<template>
  <div class="clear-con">
    <div class="clear-title" style="margin-top:0;">领币说明：清退领币申请每个账户只能提交一次申请，请认真填写，以免给您造成不必要的麻烦！
      TxHash 最多能填写两个。如有特殊情况请在备注中说明。</div>
    <div class="clear-row">
      <el-form label-width="130px" :model="clearFrom" :rules="clearRules" ref="clearFrom">
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="clearFrom.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="cellphone">
          <el-input v-model="clearFrom.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="idCardNo">
          <el-input v-model="clearFrom.idCardNo"></el-input>
        </el-form-item>
        <el-form-item label="清退MVC数量：" prop="refundQuantity">
          <el-input v-model="clearFrom.refundQuantity"></el-input>
        </el-form-item>
        <el-form-item
          prop="comment"
          label="备注：">
          <el-input type="textarea"
                    v-model="clearFrom.comment"
                    :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="subMit">
            提交申请
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <lock-recored></lock-recored>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { balanceVerification, phoneNumFilter, isCardNo } from '@/utils/validate'
  import lockRecored from '../../components/lockRecored/index'
  export default {
    name: 'clearMoney',
    components: {
      'lock-recored': lockRecored
    },
    methods: {
      subMit() {
        this.$refs.clearFrom.validate((valid) => {
          if (valid) {
            this.$store.dispatch('getClearMoney', this.clearFrom).then((res) => {
              this.$message.success('清退申请提交成功')
              this.$refs.clearFrom.resetFields();
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            this.$message.error('请完成表单填写')
            return false;
          }
        });
      }
    },
    mounted() {
    },
    data() {
      const valiRealname = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入真实姓名'))
        } else {
          callback()
        }
      }
      const valiIdCard = (rule, value, callback) => {
        if (!isCardNo(value)) {
          callback(new Error('请输入正确身份证号码'))
        } else {
          callback()
        }
      }
      const valiCellphone = (rule, value, callback) => {
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
      const valiRefundQuantity = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入数量'))
        } else {
          if(!balanceVerification(value)) {
            callback(new Error('请输入正确数字'))
          } else {
            callback()
          }
        }
      }
      return {
        clearFrom: {
          realName:'',
          idCardNo: '',
          cellphone: '',
          refundQuantity: '',
          comment: ''
        },
        clearRules: {
          realName: [{ required: true, trigger: 'blur', validator: valiRealname }],
          idCardNo: [{ required: true, trigger: 'blur', validator: valiIdCard }],
          cellphone: [{ required: true, trigger: 'blur', validator: valiCellphone }],
          refundQuantity: [{ required: true, trigger: 'blur', validator: valiRefundQuantity }],
          comment: [{ trigger: 'blur', max: 100, message: '长度在100个字节以内'}],
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index';
</style>
