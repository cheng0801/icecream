<script setup>

import Web_Content from "./Web_Content.vue";

import Web_footer from "./Web_footer.vue";
import Web_Header from "./Web_Header.vue";
import Web_side_Images from "./Web_side_Images.vue";
</script>

<template>
  <div class="flex-container">
    
    
    <Web_side_Images />
    <Web_Header />

    <Web_Content />
   <Web_footer />
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  margin: 0;
}

</style>
