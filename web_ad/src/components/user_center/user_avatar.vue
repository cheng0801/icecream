<template>
  <div class="user-info-head" @click="editCropper()">
    <el-image
      :src="options.img"
      title="点击上传头像"
      class="img-circle img-lg"
    />
    <el-dialog v-model="dialogVisible" title="图片裁剪" width="50%">
      <el-row>
        <el-col :xs="24" :md="13" :style="{ height: '350px' }">
          <VueCropper
            ref="cropperRef"
            :img="options.img"
            :info="true"
            :infoTrue="options.infoTrue"
            :auto-crop="options.autoCrop"
            :fixed-box="options.fixedBox"
            :fixedNumber="options.fixedNumber"
            :fixed="options.fixed"
            :centerBox="options.centerBox"
            @realTime="realTime"
          >
          </VueCropper>
        </el-col>
        <el-col :xs="24" :md="11" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <el-row class="ptb2">
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button>
              选择
              <el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="Plus" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button icon="Minus" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="RefreshLeft"
            @click="rotateClick('left')"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="RefreshRight"
            @click="rotateClick('right')"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button @click="refreshCrop()">重 置</el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 7 }" :md="2">
          <el-button type="primary" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue";
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";
// import utils from "@/utils/utils";
// 父级传过来的图片 interface
interface Props {
  avatar: string;
}
// 父级传过来的图片
const props = withDefaults(defineProps<Props>(), {
  avatar: "",
});
// 转化
let { avatar } = toRefs(props);
// 裁剪相关配置类型 interface
interface Options {
  img: string | ArrayBuffer | null; // 裁剪图片的地址
  info: true; // 裁剪框的大小信息
  outputSize: number; // 裁剪生成图片的质量 [1至0.1]
  outputType: "jpeg"; // 裁剪生成图片的格式
  canScale: boolean; // 图片是否允许滚轮缩放
  autoCrop: boolean; // 是否默认生成截图框
  autoCropWidth: number; // 默认生成截图框宽度
  autoCropHeight: number; // 默认生成截图框高度
  fixedBox: boolean; // 固定截图框大小 不允许改变
  fixed: boolean; // 是否开启截图框宽高固定比例
  fixedNumber: Array<number>; // 截图框的宽高比例  需要配合centerBox一起使用才能生效
  full: boolean; // 是否输出原图比例的截图
  canMoveBox: boolean; // 截图框能否拖动
  original: boolean; // 上传图片按照原始比例渲染
  centerBox: boolean; // 截图框是否被限制在图片里面
  infoTrue: boolean; // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
}
// 裁剪相关配置src\assets\img\header.jpg
const options: Options = reactive({
  img: "", // 需要剪裁的图片
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 150, // 默认生成截图框的宽度
  autoCropHeight: 150, // 默认生成截图框的长度
  fixedBox: true, // 是否固定截图框的大小 不允许改变
  info: true, // 裁剪框的大小信息
  outputSize: 0.5, // 裁剪生成图片的质量 [1至0.1]
  outputType: "jpeg", // 裁剪生成图片的格式
  canScale: true, // 图片是否允许滚轮缩放
  fixed: false, // 是否开启截图框宽高固定比例
  fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效
  full: true, // 是否输出原图比例的截图
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
});
// 裁剪之后的数据
const previews: any = ref({});
// 获取图片裁剪实例
const cropperRef: any = ref({});
// 弹窗状态
const dialogVisible = ref(false);
// 旋转图片
let rotateClick = (type: string) => {
  if (type == "left") {
    cropperRef.value.rotateLeft();
  }
  if (type == "right") {
    cropperRef.value.rotateRight();
  }
};
// 放大缩小图片比例
let changeScale = (num: number) => {
  const scale = num || 1;
  cropperRef.value.changeScale(scale);
};
// 重置图片
let refreshCrop = () => {
  cropperRef.value.refresh();
};
// 裁剪之后的数据
const realTime = (data: any) => {
  previews.value = data;
};
// 覆盖默认上传行为
let requestUpload = () => {};
// 上传预处理
let beforeUpload = (file: any) => {
  // 判断图片类型
  let img = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/PNG",
    "image/JPG",
    "image/JPEG",
  ];
  if (!img.includes(file.type)) {
    // utils._message(`图片格式有误，请重新上传`, "error");
    return false;
  }
  // 处理预上传的图片及格式
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    options.img = reader.result;
  };
};
// 编辑头像
function editCropper() {
  dialogVisible.value = true;
}
// 提交
import{useInfoStore} from '@/stores/userInfo'
import { post,get,put } from "@/utils/request";
let uploadImg = () => {
  // console.log(cropperRef.value.imgs);
  // const avatar=cropperRef.value.imgs
  
  // useInfoStore().saveInfo(avatar.value)
  cropperRef.value.getCropData((data: any) => {
    console.log(data);
    
    useInfoStore().userInfo.avatar=data
  
  put('user/0801', useInfoStore().userInfo)
    let formData = dataURLtoFile(data,'fileName.jpg')
    // 添加上传接口及相关操作
    console.log(formData);
    dialogVisible.value = false;
  });
};
// base64转图片文件
const dataURLtoFile = (dataUrl, filename) => {
	const arr = dataUrl.split(',')
	const mime = arr[0].match(/:(.*?);/)[1]
	const bstr = atob(arr[1])
	let len = bstr.length
	const u8arr = new Uint8Array(len)
	while (len--) {
		u8arr[len] = bstr.charCodeAt(len)
	}
	return new File([u8arr], filename, { type: mime })
}
onMounted(() => {
  setTimeout(() => {
    options.img = avatar.value;
  }, 100);
});
</script>

<style scoped lang="less">
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