<script setup>
import { ref,  } from "vue";
import axios from "axios";
fetchUserInfo();
const userInfo = ref([]);

async function fetchUserInfo() {
  try {
    const res = await axios.get("http://localhost:3000/users");

    // console.log(res);
    userInfo.value = res.data;

    console.log(userInfo);
    // 现在你可以在这里使用 userInfo，或者将它返回给调用者
  } catch (error) {
    console.error("Error fetching user info:", error);
    // 可以选择在这里抛出一个错误，或者返回一个默认值/错误对象
    throw error;
  }
}

// 调用函数并处理结果
// fetchUserInfo()
//   .then((userInfo) => {
//     console.log(userInfo);
//   })
//   .catch((error) => {
//     // 处理错误
//     console.error("Error handling user info:", error);
//   });
</script>

<template>
  <div class="my-top">
    <!-- <span>{{ userInfo.data.list }}</span> -->
  </div>
  <div class="my-line"></div>
  <!-- <div class="my-content">{{  }}</div> -->
</template>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  margin: 0;
}
.my-top {
  height: 43px;
  width: 100%;

  span {
    margin: 0 auto;

    font-size: 25px;
    font-weight: 700;
    color: rgb(112, 104, 104);
  }
  /* background-color: aquamarine; */
}
.my-line {
  height: 2px;
  width: 100%;
  background-color: rgb(165, 153, 153);
}
.my-content {
  width: 100%;
  height: 700px;
  background-color: aliceblue;
}
</style>
