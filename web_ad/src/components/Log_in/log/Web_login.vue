<!--
可定制插槽和 CSS 过渡效果的模态框组件。
-->

<script setup>


import log_Modal from './log_Modal.vue';


const showModal = ref(false)
</script>

<template>
  <button id="show-modal" @click="showModal = true">登录</button>
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <log_Modal :show="showModal" @close="showModal = false">

    </log_Modal>
  </Teleport>
</template>
<style scoped></style>