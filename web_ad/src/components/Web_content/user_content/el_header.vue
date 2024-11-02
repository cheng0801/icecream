<script setup></script>

<template>
  <el-header>
    <div class="home">
   
   
 

   
   <el-breadcrumb separator="/">

    <el-breadcrumb-item :to="{ path: '' }">
    <el-icon><ArrowRight/></el-icon>首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="">promotion management</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</div>
    </el-header>
    
</template>

<style scoped>
header {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>
