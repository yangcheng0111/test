<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userSetImgService } from '@/api/user'
const imageUrl = ref('')
const {
  user: { user_pic }
} = useUserStore()

imageUrl.value = user_pic
const uploadClick = ref(true)

const handleAvatarProgress = (response, uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = function () {
    imageUrl.value = reader.result
  }
  uploadClick.value = false
}

const uploadClickService = async () => {
  console.log(imageUrl.value)
  await userSetImgService(imageUrl.value)
  await useUserStore().getUser()
  ElMessage.success('头像更换成功')
  uploadClick.value = true
}

const beforeAvatarUpload = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('请选择图片!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不能大于 2MB!')
    return false
  }
  return true
}
const upload = ref()
</script>

<template>
  <page-contains title="更换头像">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      auto-upload="false"
      :show-file-list="false"
      :on-progress="handleAvatarProgress"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="button">
      <el-button
        type="primary"
        @click="upload.$el.querySelector('input').click()"
        ><el-icon><Plus /></el-icon>选择图片</el-button
      >
      <el-button
        type="success"
        @click="uploadClickService()"
        plain
        :disabled="uploadClick"
        ><el-icon><UploadFilled /></el-icon>上传图片</el-button
      >
    </div>
  </page-contains>
</template>
<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 278px;
  height: 278px;
  display: block;
}
</style>

<style>
.button {
  margin-top: 30px;
  margin-left: 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  text-align: center;
}
</style>
