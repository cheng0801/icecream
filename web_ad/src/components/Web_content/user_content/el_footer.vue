<script setup>
function getLocalTime(n) {   
	return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/,' ');   
}



</script>

<template>
 <el-footer>{{getLocalTime(1668009599000)}}</el-footer>
</template>

<style scoped>
.el-footer {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center; /*垂直居中
  /* justify-content: center; 水平居中 */
  background-color: gainsboro;
  margin: 0;
  margin-top: 80px;
  width: 100%;
}
</style>
