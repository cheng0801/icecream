<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Post_msg from "./post_msg.vue";
// import Wang_Editer from "@/components/Wang_Editer.vue";
import { getPosts } from "@/api";


const route = useRoute();
const id = route.params;
console.log(id);
const test = ref();

  getPosts().then((res) =>{
    const {data} = res
    console.log(res);
 console.log(data);
  test.value=data.data
 
   
})




</script>

<template>
  <el-main>
    <el-container class="box">
      <div class="my-top">
      
      </div>
      <div class="my-line"></div>
      <div class="my-content">
        <span v-html="test"> </span>
        
       
        <Post_msg />
      </div>
    </el-container>
  </el-main>
</template>

<style lang="scss" scoped>
.el-main {
  width: 80%;

  background-color: aquamarine;
  padding: 0;
  margin: 0;
}
.box {
  display: flex;
  flex-direction: column; /* 设置为列方向布局 */
  align-items: center; /* 实现水平居中（在列布局中主要用于子项垂直对齐，但此处配合flex-direction: column使用，确保内容不紧贴边缘） */
  height: 100%; /* 设置容器高度为视口高度 */
  width: 100%; /* 确保容器宽度充满父元素 */
  padding: 10px; /* 可选：为内容添加内边距 */
  left: 0;
  box-sizing: border-box; /* 确保内边距和边框不会增加额外宽度 */
  font-size: 20px;
  overflow-x: hidden;
  width: 100%;
}
.my-top {
  height: 40px;
  width: 100%;

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
  height: 700px;
  background-color: aliceblue;
}
</style>
