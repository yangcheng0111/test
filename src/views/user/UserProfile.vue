<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userSetInfoService } from '@/api/user'

const {
  user: { id, username, nickname, email, user_pic }
} = useUserStore()

const form = ref()
const formModel = ref({
  id,
  username,
  nickname,
  email,
  user_pic
})

const onSetInfoService = async () => {
  await form.value.validate()
  await userSetInfoService(formModel.value)
  await useUserStore().getUser()
  ElMessage.success('修改成功')
}

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'change' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'change' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['change', 'change']
    }
  ],
  username: [{ required: true, message: '请输入昵称', trigger: 'change' }]
}
</script>

<template>
  <page-contains title="基本资料">
    <el-form ref="form" :model="formModel" :rules="rules">
      <el-form-item prop="username" label="登陆名称">
        <el-input
          v-model="formModel.username"
          disabled
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称">
        <el-input v-model="formModel.nickname" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item prop="email" label="用户邮箱">
        <el-input v-model="formModel.email" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <el-form-item class="button">
      <el-button type="primary" @click="onSetInfoService">提交修改</el-button>
    </el-form-item>
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
