<script setup>
import { ref } from 'vue';
const img1 = ref(true)
const img2 = ref(true)
const img3 = ref(true)
const img4 = ref(true)



</script>

<template>

    <!-- <div class="center">
        <button @click="flag = !flag">显示/隐藏</button>
        使用v-if
     <img v-if="flag" src="../assets/img/view1.jpg"> -->
    <!--使用v-show
        <img v-show="flag" src="">
    </div> -->

    <div class="right-container">

        <div v-show="img1" class="t">
            <button class="btn-left" v-show="img1" @click="img1 = !img1">
                X
            </button>
            <a href=""> <img v-show="img1" src="../assets/img/side/view1.jpg"></a>
        </div>

        <div>
            <div v-show="img2" class="t">
                <button class="btn-left" v-show="img2" @click="img2 = !img2">
                    X
                </button>
                <a href=""> <img v-show="img2" src="../assets/img/side/view2.jpg"></a>
            </div>
        </div>
    </div>

    <div class="left-container">

        <div v-show="img3" class="t">
            <button class="btn-right" v-show="img3" @click="img3 = !img3">
                X
            </button>
            <a href=""> <img v-show="img3" src="../assets/img/side/home2.jpg"></a>

        </div>
        <div v-show="img4" class="t">
            <button class="btn-right" v-show="img4" @click="img4 = !img4">
                X
            </button>
            <a href=""> <img v-show="img4" src="../assets/img/side/home1.jpg"></a>

        </div>

    </div>

</template>

<style scoped>
img {
    width: 200px;
    height: 220px;
    margin: 5px 5px 5px 5px;


}


.right-container {
    margin-right: 20px;
    right: 0;
    height: 70vh;
    background-color: white;
    position: fixed;
    z-index: 20;
}

.left-container {
    margin-left: 20px;
    float: left;
    height: 70vh;
    background-color: white;
    position: fixed;
    z-index: 20;
}

.btn-left {
    float: right;
    background-color: rgb(145, 176, 190);
    color: red;
}

.btn-right {
    float: left;
    background-color: rgb(145, 176, 190);
    color: red;
}
</style>
