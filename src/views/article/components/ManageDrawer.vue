<script setup>
import { ref } from 'vue'
import ManageSelect from './ManageSelect.vue'
import { articleManageGetInfoService } from '@/api/article'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
import {
  articleManageAddInfoService,
  articleManageDeleteInfoService
} from '@/api/article'
import { baseURL } from '@/utils/request'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const getFormData = (object) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => {
        formData.append(key + `[${i}]`, subValue)
      })
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}
//图片预览
const img = ref()
//判断是否编辑 控制title
const catid = ref()
//上传图片后的预览
const handleAvatarChange = (uploadFile) => {
  img.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const formModel = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
//编辑回显
const manageInfo = async (id) => {
  const res = await articleManageGetInfoService(id)
  formModel.value = res.data.data
  img.value = baseURL + res.data.data.cover_img
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

const drawer = ref(false)

const emit = defineEmits(['update:visible'])
const upload = ref()

const open = async (row) => {
  drawer.value = true

  if (row.id) {
    catid.value = row.id
    //编辑
    await manageInfo(row.id)
    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await imageUrlToFile(
      img.value,
      formModel.value.cover_img
    )
  } else {
    catid.value = ''
    upload.value.clearFiles()
    img.value = ''
    //添加
    formModel.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: ''
    }
  }
}

const onAdd = async (state) => {
  if (catid.value) {
    await articleManageDeleteInfoService(catid.value)
  }
  formModel.value.state = state
  await articleManageAddInfoService(getFormData(formModel.value))
  ElMessage.success('添加成功')
  drawer.value = false
  emit('update:visible', true)
}

//表单校验规则
const rules = {
  title: [{ required: true, message: '空', trigger: 'blur' }],
  cate_id: [{ required: true, message: '空', trigger: 'blur' }],
  content: [{ required: true, message: '空', trigger: 'blur' }]
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="drawer"
    :title="catid ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form :model="formModel" :rules="rules">
      <el-form-item label="文章标题" prop="title" :label-width="formLabelWidth">
        <el-input
          placeholder="请输入标题"
          v-model="formModel.title"
          autocomplete="off"
        />
      </el-form-item>
      <manage-select v-model="formModel.cate_id" width="100%"></manage-select>

      <el-form-item
        prop="cover_img"
        label="文章封面"
        :label-width="formLabelWidth"
      >
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :on-change="handleAvatarChange"
          ref="upload"
        >
          <img v-if="img" :src="img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="文章内容"
        prop="content"
        :label-width="formLabelWidth"
      >
        <div class="content">
          <QuillEditor
            ref="quillEditor"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          />
        </div>
      </el-form-item>
      <el-form-item label="操作" :label-width="formLabelWidth">
        <el-button type="primary" @click="onAdd('已发布')">提交</el-button>
        <el-button @click="onAdd('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
/* 富文本编辑器相关样式 */
.content {
  width: 100%;
  :deep(.ql-container) {
    min-height: 200px;
  }
}

/* 图片上传相关样式 */
.avatar-uploader img {
  width: 178px;
  height: 178px;
  object-fit: cover;
}

i.el-icon.avatar-uploader-icon {
  border: 1px dashed var(--el-border-color);
  transition: border 0.25s;
}
i.el-icon.avatar-uploader-icon:hover {
  border: 1px dashed var(--el-color-primary);
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 2px;
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
