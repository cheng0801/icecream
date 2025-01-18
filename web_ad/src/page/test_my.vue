<script setup>
import { ref, onMounted } from 'vue';
const img1 = ref(true)
const img2 = ref(true)
const img3 = ref(true)
const img4 = ref(true)
import { getData } from '@/utils/request';
const imgUrl = ref('')
const getUrl = async () => {
    const res = await getData("user/1111")
    imgUrl.value = res.data
    console.log(imgUrl.value, "imgurl");
}
import img_upload from '@/components/Web_content/img_upload.vue';
onMounted(() => {
    getUrl();

})
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
        <!--  <div v-show="img1" class="img-above">
         盒子一起消失，没有占位下面图片会向上-->
        <div class="img-above">
            <span class="image-remove-view1" v-show="img1" @click="img1 = !img1">+</span>
            <a href=""> <img v-if="img1" :src="imgUrl.img1" class="cover-img"></a>
          
                 <img_upload /> 
         
        </div>

        <div class="img-below">
            <span class="image-remove-view2" v-show="img2" @click="img2 = !img2">+</span>
            <a href=""> <img v-if="img2" src="../assets/img/side/view2.jpg" class="cover-img"></a>
        </div>
    </div>

    <div class="left-container">

        <div class="img-above">

            <span class="image-remove-home1" v-show="img3" @click="img3 = !img3">+</span>
            <a href=""> <img v-if="img3" src="../assets/img/side/home1.jpg" class="cover-img"></a>
        </div>

        <div class="img-below">

            <span class="image-remove-home2" v-show="img4" @click="img4 = !img4">+</span>
            <a href=""> <img v-if="img4" src="../assets/img/side/home2.jpg" class="cover-img"></a>
        </div>

    </div>

</template>

<style lang="scss" scoped>
.img_upload {
    z-index: 1;
}

.img_over {
    z-index: 9999;
}

.img-above {
    /* background-color: aqua; */
    width: 100%;
    height: 50%;
    top: 0;
}

.img-below {
    /* background-color: aqua; */
    width: 100%;
    height: 50%;
    top: 50%;
}

img {
    z-index: 9999;
    width: 100%;
    height: 100%;

}

.image-remove-view1 {
    background-color: rgb(191, 192, 221);
    font-size: 20px;
    width: 15px;
    height: 15px;
    text-align: center;
    border-radius: 100%;
    transform: rotate(54deg);
    cursor: pointer;
    opacity: 0.5;
    top: 1%;
    left: 5%;
    display: block;
    position: absolute;
}

.image-remove-view2 {
    background-color: rgb(191, 192, 221);
    font-size: 20px;
    width: 15px;
    height: 15px;
    text-align: center;
    border-radius: 100%;
    transform: rotate(54deg);
    cursor: pointer;
    opacity: 0.5;
    top: 51%;
    left: 5%;
    display: block;
    position: absolute;
}

.image-remove-home1 {
    background-color: rgb(191, 192, 221);
    font-size: 20px;
    width: 15px;
    height: 15px;
    text-align: center;
    border-radius: 100%;
    transform: rotate(54deg);
    cursor: pointer;
    opacity: 0.5;
    top: 1%;
    left: 90%;
    display: block;
    position: absolute;
}

.image-remove-home2 {
    background-color: rgb(191, 192, 221);
    font-size: 20px;
    width: 15px;
    height: 15px;
    text-align: center;
    border-radius: 100%;
    transform: rotate(54deg);
    cursor: pointer;
    opacity: 0.5;
    top: 51%;
    left: 90%;
    display: block;
    position: absolute
}

.image-remove-view1,
.image-remove-view2,
.image-remove-home1,
.image-remove-home2 {

    line-height: 15px;
    /* 与高度相同以实现垂直居中 */
}

.right-container {
    margin-right: 0;
    right: 0;
    width: 15%;
    height: 100%;
    /* background-color: rgb(39, 42, 43); */
    position: fixed;
    z-index: 20;
}

.left-container {
    margin-left: 0;
    left: 0;
    width: 15%;
    height: 100%;
    /* background-color: rgb(17, 67, 204); */
    position: fixed;
    z-index: 20;
}
</style>
