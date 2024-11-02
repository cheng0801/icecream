<script setup>
import Web_signin from "@/components/Web_log/Web_signin.vue";
</script>

<template>
  <el-header class="header">
    <div>
      <nav class="Web-nav">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }"> -->
          <el-breadcrumb-item>
            <a href="/">
              <el-icon size="20"><House /></el-icon>
            </a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">服务</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">关于</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">帮助</a></el-breadcrumb-item>
        </el-breadcrumb>
      </nav>

      <div class="log-in">
        <el-avatar class="el-avatar"> <Web_signin /> </el-avatar>
      </div>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
 
  // opacity: 0.3;
   
  background-image: 
  linear-gradient(rgba(255, 255, 255, 0.5), 
   rgba(255, 255, 255, 0.5)), 
   url('@/assets/img/header.png');

}

.Web-nav {
  position: absolute;
  margin: 100px;
}

.el-avatar {
  background-color: #d6dee6;
}
.log-in {
  position: absolute;
  top: 80px;
  margin-left: 90%;
}
</style>
