<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

</script>

<template>
  <!-- 语言转换 -->

  <el-config-provider :locale="zhCn"><RouterView /></el-config-provider>
</template>

<style scoped></style>
