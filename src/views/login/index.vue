<template>
 <!-- 全屏容器 -->
  <div class='container'>
    <!-- 卡片容器  el-card是一个element组件，根元素上默认添加一个类和组件的名称一致 -->
    <el-card>
      <img class="myimg" src="../../assets/logo_index.png" alt="">

      <!-- 表单 -->
      <el-form ref="loginForm" :model="LoginForm" status-icon :rules="LoginRules">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号" maxlength="11" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="LoginForm.code" placeholder="请输入验证码" style="width:240px;margin-right:8px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 去判断value是否符合手机号格式
      // 格式：1开头  第二位 3-9 之间  9位数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不对'))
      }
    }
    return {
      LoginForm: {
        mobile: '17699999999',
        code: '246810'
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 以下代码可能出现异常（报错）  使用try{ 可能报错代码 }catch(e){ 处理错误 }
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.LoginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
    width:100%;
    height:100%;
    background:pink;
    position:absolute;
    left:0;
    top:0;
    background:url(../../assets/login_bg.jpg)no-repeat center / cover;
.el-card{
    width:400px;
    height:350px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    .myimg{
        // width:200px;
        display:block;
        margin:0 auto 30px;
    }
}
}
</style>
