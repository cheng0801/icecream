<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
</script>

<template>
  <el-header>    
    <div class="button" @click="router.push('/user/:id/post')">免费发帖 </div>
  </el-header>
 
</template>

<style lang="scss" scoped>
.el-header {
  border: 2px solid #000;
  width: 100%;
  height: 50px;
  display: flex;
 
  align-items: center; /* 垂直居中*/
  /* justify-content: center; 水平居中 */
  
  background-color: gainsboro;
  margin: 0;
  margin-top: 80px;
  // margin-bottom: 20px;
  width: 100%;
  
}.button {
  /* 设置边框 */
  border: 2px solid #000; /* 2px宽的黑色实线边框 */
  /* 你还可以添加其他样式，比如宽度、高度、内边距等 */
  width: 100px; /* 示例宽度 */
  height: 30px; /* 示例高度，可能需要根据实际情况调整 */
  /* 如果需要内边距，可以添加以下样式 */
  /* padding: 10px; */
  /* 如果需要圆角边框，可以添加以下样式 */
  /* border-radius: 5px; */
  display: flex; 
  align-items: center; /* 垂直居中*/
  justify-content: center; //水平居中 
  background-color: rgb(221, 114, 15);
}



</style>
