<template>
  <el-container class="main-container login">
    <el-header class="t-center">登录</el-header>
    <el-main>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="账号：" prop="username" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" :label-width="formLabelWidth" :error="formError">
          <el-input v-model="loginForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <el-row type="flex" justify="center" align="middle">
        <el-button type="primary" @click="login('loginForm')">登 录</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

  import {factory} from '@/build';

  export default {
    name: "login-view",

    data() {
      return {
        formLabelWidth: '95px',
        loginForm: {
          username: '',
          password: '',
        },
        formError: '',
        rules: {
          username: factory.getRule('username'),
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
      };
    },

    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch(types.LOGIN, this.loginForm)
              .then(({result, data}) => {
                if (!result) {
                  this.formError = data.message;
                } else {
                  this.$message({
                    message: '登录成功',
                  });
                 

                  this.$router.replace(this.$route.query.redirect || '/');
                }
              });
          } else {
            return false;
          }
        });
      }
    },
  };
</script>

<style scoped>

</style>