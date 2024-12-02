<template>
  <el-tab-pane name="label2" label="我的头像" class="user-tabpane">
    <div class="crop-wrap">
      <VueCropper
        ref="cropperRef"
        :img="imgSrc"
        :autoCrop="true"
        :centerBox="true"
        :full="true"
        :info="true"
        :canMove="true"
        :canResize="true"
        :outputSize="1"
        :outputType="'jpeg'"
        mode="contain"
      />
      <img
        v-if="cropImg"
        :src="cropImg"
        class="crop-result"
        alt="Cropped Image Preview"
      />
    </div>
    <el-button class="crop-demo-btn" type="primary">
      选择图片
      <input
        class="crop-input"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
      />
    </el-button>
    <el-button type="success" @click="cropAndSaveAvatar">上传并保存</el-button>
  </el-tab-pane>
</template>

<script setup>
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";
import { ref, onMounted } from "vue";

// const imgSrc = ref();
// const cropImg = ref("");
// const cropperRef = ref(null);

// const setImage = (e) => {
//   const target = e.target
//   const file = target.files?.[0];
//   if (!file || !file.type.startsWith("image/")) {
//     return;
//   }
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     imgSrc.value = event.target.result
//     if (cropperRef.value) {
//       cropperRef.value = event.target.result // 更新 VueCropper 图片（注意：这可能不是官方推荐的方法，但通常有效）
//       console.log(cropperRef.value)
//       cropImg.value = cropperRef.value.toDataURL();
//       console.log(cropImg.value)
//     }
//   };
//   reader.readAsDataURL(file);
// };

// const cropAndSaveAvatar = () => {
//   if (cropperRef.value) {
//     try {
//       console.log(cropperRef.value)
//       cropImg.value = cropperRef.value.getCroppedCanvas().toDataURL();

//       // 这里可以处理裁剪后的图片数据URL，比如上传到服务器
//        // 这里可以添加保存裁剪后图片的逻辑，比如上传到服务器
//     console.log("Cropped Image Data URL:", cropImg.value);
//     // 假设保存成功，可以重置 imgSrc 以展示原始图片或清空裁剪区域
//     // imgSrc.value = avatar; // 如果需要重置为原始图片
//     // 或者，如果您想保留裁剪后的图片作为预览
//     // 可以不做任何重置操作，因为 cropImg 已经保存了裁剪后的图片
//     } catch (error) {
//       console.error("裁剪图片时出错:", error);
//       // 显示错误消息给用户
//     }
//   } else {
//     console.warn("VueCropper 实例未初始化或已销毁");
//     // 显示警告消息给用户
//   }
// };
const imgSrc = ref();
const cropImg = ref("");
const cropperRef = ref(null);

const setImage = (e) => {
  const target = e.target;
  const file = target.files?.[0];
  if (!file || !file.type.startsWith("image/")) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    imgSrc.value = event.target.result; // 更新图像 URL
    // 不需要更新 cropperRef.value，VueCropper 会自动通过 img 属性更新
  };
  reader.readAsDataURL(file);
};

const cropAndSaveAvatar = () => {
  if (cropperRef.value) {
    try {
      console.log(cropperRef.value);
      // 获取裁剪后的图像 Data URL
      cropImg.value = cropperRef.getCroppedCanvas().toDataURL();
      console.log("Cropped Image Data URL:", cropImg.value);

      // 这里可以处理裁剪后的图片数据URL，比如上传到服务器
    } catch (error) {
      console.error("裁剪图片时出错:", error);
      // 显示错误消息给用户
    }
  } else {
    console.warn("VueCropper 实例未初始化或已销毁");
    // 显示警告消息给用户
  }
};
</script>

<style scoped>
.user-tabpane {
  padding: 10px 20px;
}

.crop-wrap {
  width: 500px;
  height: 350px;
  position: relative;
  margin-bottom: 20px;
}

.crop-result {
  max-width: 100%;
  margin-top: 10px;
}

.crop-demo-btn {
  position: relative;
  display: inline-block;
}

.crop-input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
