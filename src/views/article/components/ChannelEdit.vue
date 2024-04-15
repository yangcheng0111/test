<script setup>
import { ref } from 'vue'
import {
  articleChannelAddInfoService,
  articleChannelEditInfoService
} from '@/api/article'
const dialogVisible = ref(false)

const open = (row) => {
  dialogVisible.value = true
  fromModel.value = { ...row }
}

const fromModel = ref({
  cate_name: '',
  cate_alias: ''
})
//表单校验规则
const rules = {
  cate_name: [
    { required: true, message: '空', trigger: 'blur' },
    { min: 1, max: 8, message: '长度为1-8', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '空', trigger: 'blur' },
    { pattern: /^\S{1,15}$/, message: '1-15位非空字符串', trigger: 'blur' }
  ]
}

const emit = defineEmits(['success'])

const form = ref()
const onEditChannel = async () => {
  await form.value.validate()
  const isEdit = fromModel.value.id

  isEdit
    ? await articleChannelEditInfoService(fromModel.value)
    : await articleChannelAddInfoService(fromModel.value)

  dialogVisible.value = false
  ElMessage.success(isEdit ? '编辑成功' : '添加成功')

  //通知调用处刷新数据
  emit('success')
}

defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="fromModel.id ? '编辑分类' : '添加分类'"
    width="500"
    :before-close="handleClose"
  >
    <el-form :model="fromModel" :rules="rules" ref="form">
      <el-form-item
        prop="cate_name"
        label="分类名称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="fromModel.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item
        prop="cate_alias"
        label="分类别名"
        :label-width="formLabelWidth"
      >
        <el-input v-model="fromModel.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onEditChannel"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
