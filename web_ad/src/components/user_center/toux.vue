<template>
  <div class="user-info-head" @click="editCropper">
    <el-image :src="options.img" title="点击上传头像" class="img-circle img-lg" />
    <el-dialog v-model="dialogVisible" title="图片裁剪" width="50%">
      <el-row>
        <el-col :xs="24" :md="13" :style="{ height: '350px' }">
          <VueCropper
            ref="cropperRef"
            :img="options.img"
            :info="true"
            :info-true="options.infoTrue"
            :auto-crop="options.autoCrop"
            :fixed-box="options.fixedBox"
            :fixed-number="options.fixedNumber"
            :fixed="options.fixed"
            :center-box="options.centerBox"
            @real-time="realTime"
          />
        </el-col>
        <el-col :xs="24" :md="11" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.imgStyle" />
          </div>
        </el-col>
      </el-row>
      <el-row class="ptb2">
        <!-- 其他按钮和上传逻辑 -->
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import VueCropper from "vue-cropper";
// import utils from '@/utils'; // 确保这个路径是正确的

// 裁剪相关配置
const options = reactive({
  img: "",
  autoCrop: true,
  autoCropWidth: 150,
  autoCropHeight: 150,
  fixedBox: false,
  info: true,
  outputSize: 0.5,
  outputType: "jpeg",
  canScale: false,
  fixed: false,
  fixedNumber: [1, 1],
  full: true,
  canMoveBox: false,
  original: false,
  centerBox: true,
  infoTrue: true,
});


// 裁剪之后的数据
const previews = ref({});
const cropperRef = ref<any>(null);
const dialogVisible = ref(false);

// 旋转图片
const rotateClick = (type) => {
  if (type === "left") {
    cropperRef.value?.rotateLeft();
  } else if (type === "right") {
    cropperRef.value?.rotateRight();
  }
};

// 放大缩小图片比例
const changeScale = (num) => {
  cropperRef.value?.changeScale(num || 1);
};

// 重置图片
const refreshCrop = () => {
  cropperRef.value?.refresh();
};

// 裁剪之后的数据回调
const realTime = (data) => {
  previews.value = data;
};

// 覆盖默认上传行为（当前为空实现）
const requestUpload = () => {};

// 上传预处理
const beforeUpload = (file) => {
  const imgTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/PNG",
    "image/JPG",
    "image/JPEG",
  ];
  if (!imgTypes.includes(file.type)) {
    console.error("图片格式有误，请重新上传", "error");
    return false;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    options.img = reader.result as string;
  };
  return false; // 阻止默认上传行为
};

// 编辑头像
const editCropper = () => {
  dialogVisible.value = true;
  if (!options.img) {
    // 可以在这里添加逻辑来预设一个默认图片或者提示用户上传图片
  }
};

// 提交裁剪后的图片
const uploadImg = () => {
  cropperRef.value?.getCropData((data: string) => {
    const formData = dataURLtoFile(data, "croppedImage.jpg");
    // 在这里添加上传 formData 到服务器的逻辑
    console.log(formData);
    dialogVisible.value = false;
  });
};

// base64 转文件
const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bstr = atob(arr[1]);
  let len = bstr.length;
  const u8arr = new Uint8Array(len);
  while (len--) {
    u8arr[len] = bstr.charCodeAt(len);
  }
  return new File([u8arr], filename, { type: mime });
};
onMounted(() => {
  setTimeout(() => {
    options.img = avatar.value;
  }, 100);
});
</script>

<style scoped >
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}
.img-circle {
  border-radius: 50%;
}

.img-lg {
  width: 120px;
  height: 120px;
  cursor: pointer;
}
</style>
