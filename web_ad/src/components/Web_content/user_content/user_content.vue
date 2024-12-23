<script setup>
import user_side_Images from "./user_side_Images.vue";
import El_aside from "./el_aside.vue";

import Web_content_header from "@/components/Web_content/Web_content_header.vue";

import Web_Header from "@/page/Web_Header.vue";
import El_header from "./el_header.vue";

</script>

<template>
  
  <el-container class="box">
    <user_side_Images />
    <el-container class="main-box">
<El_header/>
      <el-container class="web-header-container">
        <Web_Header class="centered-header" />
      </el-container>
      <el-container class="user-content">
        <Web_content_header />
        <el-container>
          <El_aside class="sticky-div"/>
          <RouterView></RouterView>
        </el-container>
        <El_footer />
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;

  display: flex;
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中
  flex-direction: column; // 明确指定为列方向布局
  background-image: url("@/assets/img/user/bgi.jpg");
}

.main-box {
  display: flex;
  flex-direction: column; // 明确指定为列方向布局
  padding: 0;
  justify-content: center; // 水平居中
  background-color: rgb(197, 189, 189);
  width: 78%;
}

.web-header-container {
  position: fixed; // 固定在视窗顶部
  top: 0; // 距离视窗顶部 0px
  left: 10%; // 通常也需要设置 left 或 right 来确保水平位置（根据需求调整）
  right: 10%; // 如果希望容器宽度覆盖整个视窗宽度，则与 left: 0 配合使用 right: 0（或者设置 width: 100%）
  // 如果不希望覆盖整个宽度，可以设置一个具体的宽度，并使用 margin: auto; 或左右 padding 来居中
  z-index: 1000; // 确保该容器在其他内容之上（根据需要调整 z-index 值）
  display: flex;
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中
  height: 70px;
  background-color: blueviolet; // 背景色
  .centered-header {
    width: 80%;
  }
}

.user-content {
  margin-top: 10px;
  display: flex;
  flex-direction: column; // 列方向布局
  width: 100%; // 占据全部可用宽度
}

.sticky-div {
    position: -webkit-sticky; /* 对于旧版 Safari 浏览器 */
    position: sticky;
    top: 70px; /* 当滚动到距离顶部 70px 时固定 */
   
}
.test {
  .user-content {
    margin-top: 50px;
    display: flex;
    flex-direction: column; // 列方向布局
    width: 100%; // 占据全部可用宽度
  }
}
</style>
