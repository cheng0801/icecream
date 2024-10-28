<script setup>
import My_sign_in from './my_sign_in.vue';








const props = defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <button class="modal-default-button" @click="$emit('close')">
          <el-icon>
            <SwitchButton />
          </el-icon></button>

        <slot name="body">
          <My_sign_in />
        </slot>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 228, 200, 0.205);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 60%;
  margin: auto;
  padding: 20px 30px;
  background-color: rgb(11, 228, 199);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}



.modal-default-button {
  float: right;
  top: 0;
}

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>