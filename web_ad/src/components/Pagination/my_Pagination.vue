<template>
  <!-- 分页 -->
  <el-pagination class="custom_page" :currentPage="currentPage" :page-size="pageSize" :page-sizes="props.pageSizes"
    :background="props.background" :total="props.total" :pager-count="props.pagerCount" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" />
</template>
 
<script setup>
const currentPage = defineModel("currentPage", { type: Number, default: 1 })
const pageSize = defineModel("pageSize", { type: Number, default: 10 })
 
const emits = defineEmits(["handleSizeChange", "handleCurrentChange"])
const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  background: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: [10, 20, 30, 40]
  },
  pagerCount: {
    type: Number,
    default: 9 
  },
})
function handleSizeChange(val) {
  // 在被修改时，触发 "update:count" 事件
  console.log(`${val} items per page`)
  pageSize.value = val
  emits('handleSizeChange', val);
}
function handleCurrentChange(val) {
  currentPage.value = val
  console.log(`current page: ${val}`)
  emits('handleCurrentChange', val);
}
 
</script>
 
<style  scoped>
 
</style>