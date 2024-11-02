<template>
   
    <div class=".my-pagination">  
    <el-pagination layout="prev, pager, next, jumper" :total="1000" />
  </div>
</template>

<script setup>
// const props = defineProps({
//     total: '',
//     pageSize: string,
//     currentPage: string,
// })

</script>

<style scoped>
.my-pagination {
    margin: 20px auto;
    text-align: center;
}
</style>
