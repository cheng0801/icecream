<template>
  <el-form :model="form">
    <el-form-item>
      <Wang_Editer v-model="form.test" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">发帖</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";
import { posts } from "@/api";
const form = reactive({
  test: "",
});

const submitForm = async () => {
  // 构建要发送的数据
  const postData = form.test;

  // 发送 POST 请求到后端
  await posts(postData);
};
</script>
