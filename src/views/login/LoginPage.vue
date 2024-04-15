<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/index'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
const formModle = ref({
  username: '',
  password: '',
  repassword: ''
})
const form = ref()

const repasswordRules = (rule, value, callback) => {
  if (value === formModle.value.password) {
    callback()
  } else {
    callback(new Error('密码不一致'))
  }
}
const rules = {
  username: [
    { required: true, message: '空', trigger: 'blur' },
    { min: 5, max: 8, message: '长度为5-8', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '空', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '6-15位非空字符串', trigger: 'blur' }
  ],
  repassword: [
    { validator: repasswordRules, trigger: 'blur' },
    { required: true, message: '空', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '6-15位非空字符串', trigger: 'blur' }
  ]
}

const formRegister = async () => {
  await form.value.validate()
  await userRegisterService(formModle.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}

watch(isRegister, () => {
  formModle.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

const userStore = useUserStore()
const router = useRouter()
const formLogin = async () => {
  await form.value.validate()
  const res = await userLoginService(formModle.value)
  ElMessage.success('登录成功')
  userStore.setToken(res.data.token)
  router.push('/')
}
</script>

<template>
  <!-- 页面部分 -->
  <el-row class="login-page">
    <!-- 占12  一半  添加背景图 -->
    <el-col :span="12" class="bg"></el-col>
    <!-- 表单部分容器 占6 left边距3 -->
    <el-col :span="6" :offset="3" class="form">
      <!-- 表单组件 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="formModle"
        :rules="rules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <!-- label属性 添加在前面的提示语 -->
        <el-form-item prop="username">
          <!-- :prefix-icon="Lock"  配置图标 elemet图标 同样支持 :offset-->
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModle.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModle.password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModle.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="formRegister"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-else
        :model="formModle"
        :rules="rules"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModle.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModle.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="formLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/images/logo.png') no-repeat 60% center / 240px auto,
      url('@/assets/images/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
