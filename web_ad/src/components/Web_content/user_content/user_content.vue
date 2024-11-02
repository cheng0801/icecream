<script setup>
import user_side_Images from './user_side_Images.vue'
import El_aside from "./el_aside.vue";
import El_footer from "./el_footer.vue";
import El_header from "./el_header.vue";
import El_main from "./el_main.vue";
import Log_img from './log_img.vue';

</script>

<template>
 

  
    <el-container class="box">
   
   <!-- <Log_img class="log"/> -->
      <user_side_Images style="z-index: 9999;"/>
      <el-header><El_header /></el-header>
      <el-container>
        <El_aside />

        <el-container>
          <el-main><El_main /></el-main>
          <el-footer><El_footer /></el-footer>
        </el-container>
      </el-container>
    </el-container>

</template>

<style lang="scss" scoped>

.box {
  margin-top: 180px;
  height: 100%;
  width: 100%;
  background-image: url('@/assets/img/user/bgi.jpg');
}
.el-aside {
  margin-left: 100px;
  height: 500px;

  background-color: rgb(175, 26, 150);
}
.el-main {
  width: 85%;
  background-color: burlywood;
}
.el-footer {
  height: 200px;
}

.log {
  right: auto;
}
</style>
