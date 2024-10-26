<script setup>
import Web_test from '../components/Log_in/Web_test.vue';



</script>

<template>

  <div class="header">

    <nav class="Web-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <a href="/"><el-icon>
              首页
            </el-icon></a>
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
      <el-avatar class="el-avatar"> <Web_test /> </el-avatar>
    </div>
  </div>

</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #cc9d9d;
}

.Web-nav {
  margin: 10px 10px 10px 100px;
}

.el-avatar {

  color: #000;

}

.log-in {
  margin-left: 900px;
}


</style>
