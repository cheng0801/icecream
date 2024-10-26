<script setup>
import Web_Content from './page/Web_Content.vue';
import Web_footer from './page/Web_footer.vue';
import Web_Header from './page/Web_Header.vue';



</script>

<template>
   
  <div class="flex-container"> 

    <Web_Header class="header-z-index" />
    <Web_Content class="content-z-index" />
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

.header-z-index {
  z-index: 333;
  /* background-color: #3498db; */
  width: 99vw;
  height: 75px;
  position: fixed;
}

.content-z-index {
  z-index: 1;
  /* background-color: #ccb4ce; */
  margin: 100px 0 0 0;
  padding: 1;
  flex: 1;
}

.footer {
  background-color: #95a5a6;
text-align: center;
  height: 5vh;

}
</style>
