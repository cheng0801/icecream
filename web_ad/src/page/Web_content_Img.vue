<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/utils/request';

const imgUrl1 = ref([]);

const getUrl = async () => {
  try {
    const res = await getData("images");
    imgUrl1.value = res.data; 
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

onMounted(() => {
  getUrl();
});
</script>

<template>
  <el-table v-if="imgUrl1.length > 0" :data="imgUrl1" stripe style="width: 100%">
    <el-table-column >
      <template #default="scope">
        <a :href="scope.row.url" target="_blank">
          <img :src="scope.row.imgUrl" class="cover-img" alt="Image Preview">
        </a>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
img.cover-img {
  width: 100%;
  height: 100px;
  object-fit: cover; /* 确保图片按比例缩放填充容器 */
}
</style>