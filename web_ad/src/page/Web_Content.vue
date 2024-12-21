<script setup>
import my_table from "../components/Web_content/my_table.vue";
import Web_home from "@/components/Web_content/Web_content_header.vue";
import Web_content_Img from "./Web_content_Img.vue";

</script>

<template>
  <div class="content">
    <Web_content_Img class="Main-img" />

    <Web_home />
    <my_table />
  </div>
</template>

<style scoped>
.content {
  z-index: 1;
  /* background-color: #ccb4ce; */
  overflow-y: hidden;
  margin: 176px 0 0 0;
  width: 100%;
  height: 100%;
  align-self: center;

  flex: 1;
}
</style>
