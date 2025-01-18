import { defineStore } from 'pinia';
import { ref } from 'vue'; // 只导入 ref，因为我们将使用 ref 来定义状态

export const usePostStore = defineStore('userPost', () => {
  const userPost = ref({
    title: '',
    describe: '',
    user_id: 0
  }); // 使用 ref 来定义状态

  function savePost(data) {
    console.log(data,111111111111111);
    userPost.value = data; // 使用 .value 来更新 ref 的值
    console.log(data,userPost.value,"调用save");
    // 如果需要，可以在这里添加将数据保存到 localStorage 的逻辑
    // 例如：localStorage.setItem('userImg', JSON.stringify(data));
    // 但注意，由于开启了持久化存储，Pinia 可能会自动处理这部分
  }

  function removePost() {
    localStorage.removeItem("userPost");
    userPost.value = null; // 更新状态以反映移除操作
  }

  return { userPost, savePost, removePost };
});