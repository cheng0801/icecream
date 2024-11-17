<script setup>
import Web_Content from "./Web_Content.vue";
import Web_footer from "./Web_footer.vue";
import Web_Header from "./Web_Header.vue";
import Web_side_Images from "./Web_side_Images.vue";
</script>

<template>
  <div class="flex-container">
    <Web_side_Images />
    <div class="main">
      <Web_Header class="Web_Header"/>
      <Web_Content />
      <Web_footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .main {
   
  // justify-content: space-between;
  align-self: center;
  // align-items: center;
  box-sizing: border-box;
  width: 70%;
  height: 70px;
  .Web_Header {
      width: 70%;
    }
  }
}

/* .main-box {

} */
</style>
