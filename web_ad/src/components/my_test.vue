<template>
  <div>
    <Toolbar :editor="editorRef" :editorId="editorId" :defaultConfig="toolBarConfig" />
    <Editor
      v-model="htmlContent"
      :defaultConfig="editorConfig"
      :editorId="editorId"
      :style="editorStyle"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup>
import { shallowRef, ref, watch, unref, computed, onBeforeUnmount, nextTick } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor/dist/";
// import { isNumber } from "@/utils";
import { ElMessage } from "element-plus";
// import { upload } from "@/api";
// import { useFile } from "@/hooks";

// const { handleImage } = useFile();

const props = defineProps({
  editorId: {
    type: String,
    default: "custom-editor",
  },
  height: {
    type: [String, Number],
    default: "500px",
  },
  editorConfig: {
    type: Object,
    default: () => {},
  },
  toolBarConfig: {
    type: Object,
    default: () => {},
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  modelText: {
    type: String,
    default: "",
  },
  maxLength: {
    type: Number,
    default: 600,
    validator: (val) => {
      return val >= 0;
    },
  },
  placeholder: {
    type: String,
    default: "请输入...",
  },
});

const emit = defineEmits(["change", "update:modelValue", "update:modelText"]);

const editorRef = shallowRef();

const htmlContent = ref("");

watch(
  () => props.modelValue,
  (val) => {
    if (val === unref(htmlContent)) return;
    htmlContent.value = val;
    nextTick(() => {
      const dom = editorRef.value.getEditableContainer();
      if (dom) {
        handleImage(dom);
      }
      emit("update:modelText", editorRef.value.getText().trim());
    });
  },
  {
    immediate: true,
  }
);

watch(
  () => htmlContent.value,
  (val) => {
    nextTick(() => {
      const dom = editorRef.value.getEditableContainer();
      if (dom) {
        handleImage(dom);
      }
    });
    emit("update:modelValue", val);
    emit("update:modelText", editorRef.value.getText().trim());
  }
);

const handleCreated = (editor) => {
  editorRef.value = editor;
  editorRef.value.on("modalOrPanelShow", (modalOrPanel) => {
    if (modalOrPanel.type !== "modal") return;
    const { $elem } = modalOrPanel; // modal element
    const width = $elem.width();
    const height = $elem.height();
    $elem.css({
      left: "50%",
      top: "50%",
      marginLeft: `-${width / 2}px`,
      marginTop: `-${height / 2}px`,
      zIndex: 1000,
      position: "fixed",
      height: "fit-content",
    });
  });
};

// 编辑器配置
const editorConfig = computed(() => {
  return Object.assign(
    {
      placeholder: props.placeholder,
      maxLength: props.maxLength,
      readOnly: props.readonly,
      customAlert: (s, t) => {
        // 自定义编辑器警告提示（比如：上传图片过大等）
        switch (t) {
          case "success":
            ElMessage.success(s);
            break;
          case "info":
            ElMessage.info(s);
            break;
          case "warning":
            ElMessage.warning(s);
            break;
          case "error":
            ElMessage.error(s);
            break;
          default:
            ElMessage.info(s);
            break;
        }
      },
      autoFocus: false,
      scroll: true,
      MENU_CONF: {
        ["uploadImage"]: {
          async customUpload(file, insertFn) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await upload(formData);
            // 插入图片 将id和sign传入并保存，渲染的时候使用
            insertFn("", "", `${res.data.id}&${res.data.sign}`);
          },
        },
      },
      hoverbarKeys: {
        // 在点击上传完成的图片时，会弹出快捷编辑框，去除‘编辑’和’查看链接‘按钮，只保留如下按钮配置
        image: {
          menuKeys: ["imageWidth30", "imageWidth50", "imageWidth100", "deleteImage"],
        },
      },
    },
    props.editorConfig || {}
  );
});

// 工具栏配置
const toolBarConfig = computed(() => {
  return Object.assign(
    {
      excludeKeys: ["emotion", "group-video"], // 去除emo表情按钮，视频上传按钮
    },
    props.toolBarConfig
  );
});

// 编辑器样式
// const editorStyle = computed(() => {
//   return {
//     height: isNumber(props.height) ? `${props.height}px` : props.height,
//   };
// });

const handleChange = (editor) => {
  emit("change", editor);
};

onBeforeUnmount(() => {
  const editor = unref(editorRef.value);
  editor.destroy();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css" scoped></style>
