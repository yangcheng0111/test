<script setup>
import { ref } from 'vue'
import { articleChannelGetInfoService } from '@/api/article'
//获取分类数据
const categoryList = ref([])

const getCatrgoryList = async () => {
  const res = await articleChannelGetInfoService()
  categoryList.value = res.data.data
}
getCatrgoryList()
defineProps({
  width: {
    type: String
  },
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-form-item prop="cate_id" label="文章分类">
    <el-select
      placeholder="请选择"
      :style="{ width }"
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      validate-event="true"
    >
      <el-option
        v-for="item in categoryList"
        :key="item.id"
        :label="item.cate_name"
        :value="item.id"
      />
    </el-select>
  </el-form-item>
</template>
