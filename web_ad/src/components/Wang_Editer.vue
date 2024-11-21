<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

//声明属性
//
// 声明属性，Vue 会自动处理类型
const props = defineProps({
  modelValue: String,
});

// 声明事件
const emits = defineEmits(["update:modelValue"]);
// const emits =defineEmits<{(e:"update:modelValue",value:string):void}>()

// 编辑器实例
const editorRef = shallowRef(null);

// 内容 HTML
const valueHtml = ref(props.modelValue || "<p>公益特色t</p>");

// 监听 props.modelValue 的变化，并更新 valueHtml
watchEffect(() => {
  valueHtml.value = props.modelValue;
});

// 当 valueHtml 变化时，触发 update:modelValue 事件
watch(valueHtml, (newHtml) => {
  emits("update:modelValue", newHtml);
});

// 模拟异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "";
  }, 1500);
});

// 工具栏配置
const toolbarConfig = {};

// 编辑器配置
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      server: "posts",
      // 自定义插入图片
      fieldName: "file",
      customInsert(res, insertFn) {
        // res 即服务端的返回结果
        const url = res.data.url;
        const alt = res.data.alt;
        const href = res.data.href;
        insertFn(url, alt, href);
      },
    },
  },
};

// 组件销毁时销毁编辑器实例
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) {
    editor.destroy();
  }
});

// 当编辑器创建时记录 editor 实例
const handleCreated = (editor) => {
  editorRef.value = editor;
};
</script>
