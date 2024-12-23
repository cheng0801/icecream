<script setup>
import { ref, onMounted, onUnmounted } from "vue";
function getLocalTime(n) {
  return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

const time = ref('');
const date = ref('')
// 更新当前时间
const updateTime = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString(); // 格式为hh:mm:ss
  const dateString = now.toLocaleDateString(); // 格式为YYYY/MM/DD，具体格式可能因地区而异
  time.value = timeString; // 时间
  date.value = dateString; //日期
};

// 组件挂载后启动定时器
onMounted(() => {
  updateTime();
  const interval = setInterval(updateTime, 1000); // 每秒更新一次时间

  // 清理定时器，防止内存泄漏
  onUnmounted(() => {
    clearInterval(interval);
  });
})

</script>

<template>
  <el-footer>
    <div class="footer-container">
      <div class="time">

        <div class="footer-time">{{ time }}</div>
        <div class="footer-date">{{ date }}</div>
      </div>

    </div>

  </el-footer>
</template>

<style scoped>
.el-footer {
  width: 100%;
  height: 50px;
  /* display: flex;
  align-items: center;/*垂直居中*/

  /*justify-content: flex-end; */
  /* justify-content: center; 水平居中 */
  background-color: gainsboro;
  padding: 5px;
  margin-top: 80px;
  width: 100%;
}

.footer-container {
  width: 100%;
  height: 100%;

  /* background-color: aquamarine; */
}

.time {
  margin-left: 90% ;
  /* background-color: brown; */
  width: 100px;
  height: 40px;
}

.footer-time {
  display: flex;
  justify-content: center;
  align-items: center;
  /*垂直居中*/

  width: 100px;
  height: 20px;
  /* background-color: chartreuse; */
}

.footer-date {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  width: 100px;
  height: 20px;
  /* background-color: blue; */
}
</style>
