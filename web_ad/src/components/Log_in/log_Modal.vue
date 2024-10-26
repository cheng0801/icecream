<script setup>
import Web_login from './Web_login.vue';


const props = defineProps({
    show: Boolean
})
</script>

<template>
    <Transition name="modal">

        <div v-if="show" class="modal-mask">
            <!-- <div class="modal-container"> -->
                <slot>
                    <button class="modal-default-button" @click="$emit('close')">
                        X
                    </button>
                    <Web_login class="modal-container"/>

                </slot>
            <!-- </div> -->
        </div>

    </Transition>
</template>

<style>
.modal-mask {
    /* position: fixed; */
    z-index: 9998;
    top: 85px;
    left: 500px ;
    width: 500px;
    height: 400px;

    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 500px;
    height: 400px;
    /* margin: 40px; */
    padding: 20px 30px;
    background-color: #186ce9;


    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
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