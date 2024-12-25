<script setup>
import { ref } from 'vue';
const cs=ref('11114555655')
</script>

<template>
  <el-header>    
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <el-icon :size="15"><HomeFilled /></el-icon>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
        首页
        </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="kf">公益客服XX:<span class="tel">{{ cs }}</span></div>
  </el-header>
 
</template>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center; /* 垂直居中*/
  /* justify-content: center; 水平居中 */
  
  background-color: gainsboro;
  margin: 0;
  // margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  .el-breadcrumb { 
    margin: 0 200px 0 0;
  }
  .el-breadcrumb-item{
    align-items: center; /* 垂直居中*/
  }
  .kf{
    color: rgb(81, 90, 29);
    font-family:'Times New Roman', Times, serif;
    font-size: 20px;
    font-weight: 900;
    .tel{
      color: rgb(64, 94, 9);
    }
  }
}
</style>
