<script setup>
import {
  articleChannelGetInfoService,
  articleChannelDeleteInfoService
} from '@/api/article'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const channeList = ref([])
const loading = ref(false)
const dialog = ref()

const getChanneList = async () => {
  loading.value = true
  const res = await articleChannelGetInfoService()
  channeList.value = res.data.data
  loading.value = false
}
getChanneList()

const onSuccess = () => {
  getChanneList()
}

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm(
    `你确认要删除该文章分类吗?  (${row.cate_name})`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  await articleChannelDeleteInfoService(row.id)

  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  getChanneList()
}

const onAddChannel = () => {
  dialog.value.open({})
}
</script>

<template>
  <page-contains title="文章分类">
    <template #exic>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channeList" border style="width: 100%">
      <el-table-column type="index" width="180" />
      <el-table-column prop="cate_name" label="分类名称" width="180" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column>
        <template #header> 编辑 </template>
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          />
          <el-button
            @click="onDeleteChannel(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          />
        </template>
      </el-table-column>

      <!-- 使用插槽 指定数据为空时的状态 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-contains>
</template>
