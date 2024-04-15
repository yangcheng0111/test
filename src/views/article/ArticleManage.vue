<script setup>
import { ref } from 'vue'
import ManageSelect from './components/ManageSelect.vue'
import { Delete, Edit } from '@element-plus/icons-vue'

import { articleManageGetListService } from '@/api/article'
import { fommatTime } from '@/utils/fommatTime.js'
import ManageDrawer from './components/ManageDrawer.vue'

const loading = ref(false)
const total = ref(0)
const selectModel = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const drawer = ref()

const manageList = ref([])
const getManageList = async () => {
  loading.value = true
  const res = await articleManageGetListService(selectModel.value)
  manageList.value = res.data.data
  loading.value = false
  total.value = res.data.total
}
getManageList()

const onEditManage = (row) => {
  drawer.value.open(row)
}

const onDeleteManage = (row, $index) => {
  console.log(row, $index)
}
const onSelect = () => {
  selectModel.value.pagenum = 1
  getManageList()
}

const cleanManageModel = () => {
  selectModel.value.cate_id = ''
  selectModel.value.state = ''
  selectModel.value.pagenum = 1
  getManageList()
}
const onSizeChange = (size) => {
  selectModel.value.pagesize = size
  selectModel.value.pagenum = 1
  getManageList()
}

const onCurrentChange = (pagenum) => {
  selectModel.value.pagenum = pagenum
  getManageList()
}
</script>

<template>
  <page-contains title="文章管理">
    <template #exic>
      <el-button type="primary" @click="onEditManage({})">发布文章</el-button>
    </template>
    <el-form :inline="true" class="demo-form-inline">
      <manage-select
        v-model="selectModel.cate_id"
        width="240px"
      ></manage-select>
      <el-form-item label="发布状态:">
        <el-select
          v-model="selectModel.state"
          placeholder="请选择"
          clearable
          style="width: 240px"
        >
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSelect">搜索</el-button>
        <el-button @click="cleanManageModel">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="manageList" style="width: 100%">
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="cate_name" label="分类" width="180" />
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ fommatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="address">
        <template #header> 操作 </template>

        <template #default="{ row, $index }">
          <el-button
            @click="onEditManage(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDeleteManage(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>

      <!-- 使用插槽 指定数据为空时的状态 -->
      <template #empty>
        <el-empty description="无数据" />
      </template>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="selectModel.pagenum"
      v-model:page-size="selectModel.pagesize"
      :page-sizes="[2, 3, 5, 7]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 30px; justify-content: flex-end"
    />
  </page-contains>

  <!-- 抽屉组件 -->
  <manage-drawer ref="drawer" @update:visible="getManageList"></manage-drawer>
</template>
