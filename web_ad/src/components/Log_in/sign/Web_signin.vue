<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>

import { ref } from 'vue'
import sign_Modal from './sign_Modal.vue';

const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true">注册</button>
  
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <sign_Modal :show="showModal" @close="showModal = false">
  
    </sign_Modal>
  </Teleport>
</template>
<style scoped>

</style>