<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="pageContains">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="exic"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style>
.pageContains {
  min-height: 100%;
  box-sizing: border-box;
}
.pageContains .card-header {
  display: flex;

  justify-content: space-between;
  align-items: center;
}
</style>
