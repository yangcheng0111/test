<script setup>
import { ref } from 'vue'
import { userSetPwdService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = ref()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const pwdTwovalidator = () => {
  return formModel.value.new_pwd === formModel.value.re_pwd
}
const rules = {
  old_pwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    {
      pattern: /^\S{3,15}$/,
      message: '长度在 3 到 15非空字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '长度在 6 到 15非空字符',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: pwdTwovalidator,
      trigger: 'blur',
      message: '两次输入密码不一致'
    }
  ]
}

const onSetInfoPwdService = async () => {
  await form.value.validate()
  await userSetPwdService(formModel.value)
  ElMessage.success('修改成功')
  await useUserStore().removeToken()
  router.push('/login')
}
</script>

<template>
  <page-contains title="重置密码">
    <el-form ref="form" :model="formModel" :rules="rules">
      <el-form-item prop="old_pwd" label="原密码">
        <el-input v-model="formModel.old_pwd" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item prop="new_pwd" label="新密码">
        <el-input v-model="formModel.new_pwd" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item prop="re_pwd" label="确认新密码">
        <el-input v-model="formModel.re_pwd" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="onSetInfoPwdService"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </page-contains>
</template>

<style>
.el-form-item {
  margin-left: 30px;
  line-height: 40px;
}
.el-form-item .el-input {
  width: 50%;
  height: 40px;
}
.button {
  padding-left: 68px;
}
</style>
