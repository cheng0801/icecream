<script setup>
import { ref, onMounted } from 'vue';
const img1 = ref(true)
const img2 = ref(true)
const img3 = ref(true)
const img4 = ref(true)
import { getData } from '@/utils/request';


const imgUrl1 = ref({});
const imgUrl2 = ref({});
const imgUrl3 = ref({});
const imgUrl4 = ref({});

import { moren } from '@/assets/img/web_ad';

const getUrl1 = async () => {
  try {
    const res = await getData("images/1");
    // 假设res.data是一个包含多个图片的数组，每个图片对象有一个url属性
    if(res.data){
      imgUrl1.value = res.data; // 将res.data赋值给imgUrl.value
    }else {
      imgUrl1.value=moren[4]
    }
    
    // 正确输出第一个图片的url（如果存在）
  
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const getUrl2 = async () => {
  try {
    const res = await getData("images/2");
    // 假设res.data是一个包含多个图片的数组，每个图片对象有一个url属性
    if(res.data){
      imgUrl2.value = res.data; // 将res.data赋值给imgUrl.value
    }else {
      imgUrl2.value=moren[3]
    }
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const getUrl3 = async () => {
  try {
    const res = await getData("images/3");
    // 假设res.data是一个包含多个图片的数组，每个图片对象有一个url属性
    if(res.data){
      imgUrl3.value = res.data; // 将res.data赋值给imgUrl.value
    }else {
      imgUrl3.value=moren[2]
    }
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const getUrl4 = async () => {
  try {
    const res = await getData("images/4");
    if(res.data){
      imgUrl4.value = res.data; // 将res.data赋值给imgUrl.value
    }else {
      imgUrl4.value=moren[1]
    }
  
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

onMounted(() => {
  
  getUrl1();
  getUrl2();
  getUrl3();
  getUrl4();
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
      <a :href=imgUrl1.url target="_blank"> <img v-if="img1" :src="imgUrl1.imgUrl" class="cover-img" alt="1111"></a>
    </div>
    <div class="img-below">
      <span class="image-remove-view2" v-show="img2" @click="img2 = !img2">+</span>
      <a :href=imgUrl2.url target="_blank"> <img v-if="img2" :src="imgUrl2.imgUrl" class="cover-img"></a>
    </div>
  </div>
  <div class="left-container">
    <div class="img-above">
      <span class="image-remove-home1" v-show="img3" @click="img3 = !img3">+</span>
      <a :href=imgUrl3.url target="_blank"> <img v-if="img3" :src="imgUrl3.imgUrl" class="cover-img"></a>
    </div>
    <div class="img-below">
      <span class="image-remove-home2" v-show="img4" @click="img4 = !img4">+</span>
      <a :href=imgUrl4.url target="_blank"> <img v-if="img4" :src="imgUrl4.imgUrl" class="cover-img"></a>
    </div>
  </div>

</template>

<style scoped>
.img-above {
  /* background-color: aqua; */
  width: 100%;
  height: 50%;
  top: 0;
  /* padding: 0.5%; */
}

.img-below {
  /* background-color: aqua; */
  width: 100%;
  height: 50%;
  top: 50%;
}

img {
  width: 100%;
  height: 100%;

}

.image-remove-view1 {
  position: absolute;
  /* top: 10px; 调整顶部距离，根据需要修改 */
  /* left: 10px; 调整左侧距离，对于.image-remove-view2可以使用right属性 */
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
  right: 5%;
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
  right: 5%;
  display: block;
  position: absolute;
}

.image-remove-view1,
.image-remove-view2,
.image-remove-home1,
.image-remove-home2 {

  line-height: 15px;
  /* 与高度相同以实现垂直居中 */
}

.right-container {
  top: 0;
  margin-right: 0;
  right: 0;
  width: 10%;
  height: 100%;
  /* background-color: rgb(39, 42, 43); */
  position: fixed;
  z-index: 20;
}

.left-container {
  top: 0;
  margin-left: 0;
  left: 0;
  width: 10%;
  height: 100%;
  /* background-color: rgb(17, 67, 204); */
  position: fixed;
  z-index: 20;
}
</style>
