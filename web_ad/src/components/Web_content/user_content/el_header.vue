<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
function goBack() {
    window.history.back();
}
</script>

<template>
  <el-header>    
    <div class="button" > <button @click="router.push('/user/:id/post')">免费发帖</button></div>
    <div class="button" > <button @click="goBack">返回</button></div>
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

  margin-top: 80px;
  // margin-bottom: 20px;
  width: 100%;
  
}
.button {
  background-color:gainsboro;

    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 创建三列，每列宽度相等 */
    grid-template-rows: 30px ; /* 创建1行，*/
    gap: 10px; /* 网格项之间的间隙 */

  
 
  
}



</style>
