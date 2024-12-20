<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPosts } from "@/api"; // 假设 getPosts 现在负责处理 ID 参数并返回正确的数据

const route = useRoute();
const postId = route.params.id; // 假设 URL 参数中有一个名为 'id' 的参数
const mposts = ref(null); // 初始化为 null，表示数据尚未加载

onMounted(() => {
  getPosts(postId).then((res) => {
    if (res && res.data) {
      mposts.value = res.data.content; // 假设 res.data 是一个包含 title 和 content 的对象
    } else {
      console.error("Failed to load post data:", res);
      mposts.value = {}; // 或者显示一个错误消息的对象
    }
  }).catch((error) => {
    console.error("Error loading post data:", error);
    mposts.value = {}; // 或者显示一个错误消息的对象
  });
});
</script>

<template>
  <el-main>
   <div> 
    <div class="my-top" v-if="mposts">
        <span>{{ mposts.title }}</span>
    </div>
    <div class="my-line"></div>
    <el-container class="box">  
      <div class="my-content" v-if="mposts">
        <span v-html="mposts.content"></span>
      </div>
    </el-container></div>
  </el-main>
</template>


<style lang="scss" scoped>
.el-main {
  width: 80%;
  background-color: rgb(194, 202, 199);
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.box {
  display: flex;
  flex-direction: column; /* 设置为列方向布局 */
  align-items: center; /* 实现水平居中（在列布局中主要用于子项垂直对齐，但此处配合flex-direction: column使用，确保内容不紧贴边缘） */
  height: 100%; /* 设置容器高度为视口高度 */
  width: 100%; /* 确保容器宽度充满父元素 */
  padding: 15px; /* 可选：为内容添加内边距 */
  left: 0;
  box-sizing: border-box; /* 确保内边距和边框不会增加额外宽度 */
  font-size: 20px;
  overflow-x: hidden;
  width: 100%;
}
.my-top {
  height: 40px;
  width: 100%;
margin: 5px;
  span {
    margin: 0 auto;

    font-size: 25px;
    font-weight: 700;
    color: rgb(112, 104, 104);
  }
  /* background-color: aquamarine; */
}
.my-line {
  height: 2px;
  width: 100%;

  background-color: rgb(165, 153, 153);
}
.my-content {
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(202, 205, 211);
}
</style>
