<script setup>
import Web_Header from './page/Web_Header.vue';


</script>

<template>
  <div class="flex-container">
<!-- <Web_Header/> -->
    <RouterView />
    
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  margin: 0;
}

/* .header-z-index {
  z-index: 333;
  /* background-color: #3498db; 
  width: 70%;
  height: 180px;
  position: fixed;
  align-self: center;
} */

/* .content-z-index {
  z-index: 1;
  /* background-color: #ccb4ce; 
  margin: 176px 0 0 0;
  width: 70%;
  align-self: center;

  flex: 1;
} */

/* .footer {
  background-color: #95a5a6;
  text-align: center;
  height: 5vh;
  width: 70%;
  align-self: center;
} */
</style>
