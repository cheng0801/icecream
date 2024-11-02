<script setup>
import Web_login from '@/components/Log_in/log/Web_login.vue';
import Web_signin from '@/components/Log_in/sign/Web_signin.vue';







</script>

<template>

  <div class="header">

    <nav class="Web-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <a href="/"><el-icon size="20"><House/></el-icon></a>
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
      <el-avatar class="el-avatar"> <Web_login /> </el-avatar>
    </div>
  </div>
  
</template>

<style lang="scss" scoped>
.header {
  
  position: absolute;
  
  
  background-color: #cc9d9d;
}

.Web-nav {
  position: absolute;
  margin: 80px;

  

}

.el-avatar {

background-color  : #d6dee6;


}
.log-in {
  position: absolute;
top: 80px;
margin-left: 70%;

}



</style>
