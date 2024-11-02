<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>

import { ref } from 'vue'
import sign_Modal from './sign_Modal.vue';

const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true" > 
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
  </button>
  
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <sign_Modal :show="showModal" @close="showModal = false">
  
    </sign_Modal>
  </Teleport>
</template>
<style scoped>

</style>