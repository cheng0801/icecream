<script setup>
import user_side_Images from "./user_side_Images.vue";
import El_aside from "./el_aside.vue";
import El_footer from "./el_footer.vue";
import El_header from "./el_header.vue";
import El_main from "./el_main.vue";
import Web_Header from "@/page/Web_Header.vue";

</script>

<template>
  <el-container class="box">
  <!-- <div class="web-header">
    <Web_Header />
  </div> -->

    <user_side_Images />
    <el-container class="user-content">
      <el-header><El_header /></el-header>
      <el-container>
        <El_aside />

        <el-container>
          <el-main><El_main /> <router-view></router-view></el-main>
          <el-footer><El_footer /></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.box {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/img/user/bgi.jpg");
}

// .web-header {
//   height: 180px;
//   width: 900px;
//   background-color: blueviolet;
// }
.user-content {
  margin-top: 180px;
}
.el-aside {
  margin-left: 103px;
  height: 500px;
  overflow-y: hidden;
  background-color: rgb(240, 234, 234);
}
.el-main {
  padding: 5px;
  width: 85%;
  background-color: rgb(236, 230, 222);
  height: 800px;
  overflow-y: hidden;
}
.el-footer {
  height: 200px;
}


</style>
