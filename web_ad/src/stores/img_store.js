import { defineStore } from 'pinia';
import { ref } from 'vue'; // 只导入 ref，因为我们将使用 ref 来定义状态

export const useImgStore = defineStore('userImg', () => {
  const userImg = ref(null); // 使用 ref 来定义状态

  function saveImg(data) {
    console.log(data, "asdfyyyyyyyyyyyyyyyyyyyyyyyyy");
    userImg.value = data; // 使用 .value 来更新 ref 的值
    console.log("调用save");
    // 如果需要，可以在这里添加将数据保存到 localStorage 的逻辑
    // 例如：localStorage.setItem('userImg', JSON.stringify(data));
    // 但注意，由于开启了持久化存储，Pinia 可能会自动处理这部分
  }

  function remove() {
    localStorage.removeItem("userImg");
    userImg.value = null; // 更新状态以反映移除操作
  }

  return { userImg, saveImg, remove };
}, {
  persist: true, // 开启持久化存储
});