<template>
  <div class="search-container">
    <!-- 定义一个表单容器，使用内联布局，并绑定query对象作为数据模型 -->
    <el-form ref="searchRef" :model="query" :inline="true">
      <!-- 遍历options数组，动态生成表单项 -->
      <el-form-item :label="item.label" :prop="item.prop" v-for="item in options">
        <!-- 根据item的类型渲染不同的输入组件 -->
        <!-- 如果是文本框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="query[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          clearable
        ></el-input>
      
      </el-form-item>
      <!-- 提交和重置按钮 -->
      <el-form-item>
        <el-button type="primary" :icon="Search" >搜索</el-button>
        <el-button :icon="Refresh" @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { Search, Refresh } from "@element-plus/icons-vue";
import { PropType, ref } from "vue";
import { FormOptionList } from "@/types/form-option";

// 定义组件接收的props
const props = defineProps({
  query: {
    type: Object, // query对象，用于绑定表单数据
    required: true,
  },
  options: {
    type: Array as PropType<Array<FormOptionList>>, // 表单选项数组，用于动态生成表单项
    required: true,
  },
  search: {
    type: Function, // 搜索函数，当点击搜索按钮时调用
    default: () => {},
  },
});

// 创建一个引用，用于访问表单实例
const searchRef = ref<FormInstance>();

// 重置表单的方法
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return; // 如果表单实例不存在，则直接返回
  formEl.resetFields(); // 重置表单字段
  props.search(); // 调用搜索函数，可能是为了触发搜索或清除搜索结果
};
</script>

<style scoped>
.search-container {
  padding: 20px 30px 0;
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
