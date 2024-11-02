<script setup>
import my_table from "../components/Web_content/my_table.vue";
import Web_home from "@/components/Web_content/Web_home.vue";
// import MainTable from '../components/Web_content/MainTable.vue';
import Web_content_Img from "./Web_content_Img.vue";
import User_content from "@/components/Web_content/user_content/user_content.vue";


</script>

<template>
  <div class="content">
    <Web_content_Img class="Main-img" />

    <!-- <User_content/> -->
    <!-- <el-scrollbar>
      <RouterView />
    </el-scrollbar> -->
    <Web_home />

    <my_table class="my-table" />

    <!-- <MainTable class="Main-table"></MainTable> -->
  </div>
</template>

<style scoped>
/* .Main-table {
    margin: 0 auto; 
    
 }  */
.my-table {
  padding: 20px;
}
</style>
