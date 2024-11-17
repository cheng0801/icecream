<script setup></script>

<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">
        <el-icon><ArrowRight /></el-icon>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <a href="">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<style scoped>
.el-header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center; /* 垂直居中*/
  /* justify-content: center; 水平居中 */
  background-color: gainsboro;
  margin: 0;
  margin-top: 80px;
  width: 100%;
}
</style>
