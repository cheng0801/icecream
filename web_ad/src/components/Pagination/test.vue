<template>
    <el-dialog
      :title="allowVideo?'Image/Video':'Image'"
      v-model="_dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      width="600px"
    >
      <div class="avatar-container" v-loading="uploadLoading">
          <!-- {{dialogVisible}} -->
        <!-- 待上传图片 -->
        <div v-show="!options.img&&!options.video" >
          <el-upload
            class="upload"
            ref="elUpload"
            action="#"
            :on-change="upload"
            :accept="acceptRule"
            :show-file-list="false"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="large"  type="primary" ref="uploadBtn">
              {{allowVideo?'Image/Video':'Image'}}
            </el-button>
          </el-upload>
          <div class="tips-wrods">Support pictures in jpg and png formats, with size no more than 2MB</div>
          <div class="tips-wrods" v-if="allowVideo">Support video in mp4 format, with size no more than 150MB</div>
        </div>
        <!-- <img :src="options.img" alt=""> -->
        <!-- 已上传图片 -->
        <div v-show="options.img" class="avatar-crop">
          <vueCropper
            class="crop-box"
            ref="cropper"
            :img="options.img"
            :autoCrop="options.autoCrop"
            :fixedBox="options.fixedBox"
            :canMoveBox="options.canMoveBox"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :centerBox="options.centerBox"
            :fixed="options.fixed"
            :fixedNumber="options.fixedNumber"
            :canMove="options.canMove"
            :canScale="options.canScale"
          ></vueCropper>
        </div>
        <div v-show="options.video" class="avatar-crop">
          <video :src="options.video"></video>
        </div>
      </div>
      <template #footer>
      <span  class="dialog-footer">
        <div class="reupload" @click="reupload">
          <span v-show="(options.img||options.video)&&!uploadLoading">重新上传</span>
        </div>
        <div>
          <el-button @click="closeDialog" :disabled="uploadLoading">取 消</el-button>
          <el-button type="primary" @click="getCrop" :disabled="uploadLoading">确 定</el-button>
        </div>
      </span>
      </template>
    </el-dialog>
  </template>
  
  <script lang="ts" >
  import {ref,reactive,defineComponent,computed,onMounted,} from "vue"
  import { VueCropper } from 'vue-cropper'
  import 'vue-cropper/dist/index.css'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  import {uploadFile} from '@/api/request/projectManagement/index'
  import {
      ElMessage
  } from 'element-plus'
  export default defineComponent({
    props: {
      dialogVisible: {
        type: Boolean,
      },
      allowVideo:{
        type: Boolean,
        default:true,
      }
    },
    components:{
      VueCropper
    },
    setup(props, { emit }) {
      const acceptRule = ref('image/png, image/jpeg, image/jpg,.mp4')
      onMounted(()=>{
        if(!props.allowVideo){
          acceptRule.value = 'image/png, image/jpeg, image/jpg'
        }
      })
      
  
      const _dialogVisible = computed({
        get(){
          return props.dialogVisible
        },
        set(val){
          emit('update:dialogVisible',false)
        }
      })
      // console.log(11111);
      const cropper=ref()
      const uploadBtn=ref()
      const elUpload=ref()
      const options=reactive({
        img: '', // 原图文件
        video: '', // 原图文件
        autoCrop: true, // 默认生成截图框
        fixedBox: false, // 固定截图框大小
        canMoveBox: true, // 截图框可以拖动
        autoCropWidth: 200, // 截图框宽度
        autoCropHeight: 200, // 截图框高度
        fixed: true, // 截图框宽高固定比例
        fixedNumber: [16, 9], // 截图框的宽高比例
        centerBox: true, // 截图框被限制在图片里面
        canMove: false, // 上传图片不允许拖动
        canScale: false // 上传图片不允许滚轮缩放
      })
  
      // 读取原图
      const fileType = ref('')
      //视频数据
      const videoData = ref('')
      const upload: UploadProps['onChange'] = (file:any, uploadFiles) => {
        // console.log('原始',file);
        const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
        const isLt5M = file.raw.size / 1024 / 1024 < 2
  
        const isVIDEO = file.raw.type === 'video/mp4'
        const isLt150M = file.raw.size / 1024 / 1024 < 150
        if(isIMAGE&&!isLt5M){
          ElMessage.warning("Picture size cannot exceed 2MB" );
          return false
        }else if(props.allowVideo&&isVIDEO&&!isLt150M){
          ElMessage.warning("Video size cannot exceed 150MB" );
          return false
        }else if(isIMAGE&&isLt5M){
          fileType.value = 'img'
          let reader = new FileReader()
          reader.readAsDataURL(file.raw)
          reader.onload = (e:any) => {
            options.img = e.target.result // base64
          }
          elUpload.value.clearFiles(); //这里处理重新上传时，upload组件change事件错误问题
        }else if(isVIDEO&&isLt150M){
          fileType.value = 'video'
          let reader = new FileReader()
          reader.readAsDataURL(file.raw)
          videoData.value = file.raw
          reader.onload = (e:any) => {
            options.video = e.target.result // base64
          }
          elUpload.value.clearFiles(); //这里处理重新上传时，upload组件change事件错误问题
        }      
      }
        // 获取截图信息
      const getCrop=async ()=> {
        if(fileType.value=='img'){
          // 获取截图的 blob 数据
          await cropper.value.getCropBlob(async data => {
            // console.log('长啥样',data)
            //上传操作
            doUpload(data)
          })
        }else{
          //上传操作
          doUpload(videoData.value)
        }
      }
  
      //接口上传
      const uploadLoading = ref(false)
      const doUpload = async (data) =>{
        let formData = new FormData();
        //第三个参数是规定以什么为后缀，接口是根据后缀来返回地址格式的
        formData.append("formFile", data);
        // console.log('上传',data)
        uploadLoading.value = true
        let res = await uploadFile(formData)
        if(res.success){
          ElMessage.success({
            message: 'Upload Success'
          });
          let obj = Object.assign({},res.data)
          obj.type = fileType.value
          obj.fileValue = fileType.value=='img'?1:0
          emit('getUrl',obj)
          uploadLoading.value = false
        }else{
          ElMessage.warning({
            message: 'Upload Failed'
          });
          uploadLoading.value = false
        }
        closeDialog()
      }
      // 重新上传
      const reupload=()=> {
        options.img = ''
        options.video = ''
        uploadBtn.value.ref.click()
      }
      // 关闭弹框
      const closeDialog=()=> {
        emit('update:dialogVisible',false)
        options.img = ''
        options.video = ''
      }
   return {
      _dialogVisible,
      options,
      cropper,
      uploadBtn,
      elUpload,
      upload,
      getCrop,
      reupload,
      closeDialog,
      acceptRule,
      uploadLoading,
    }
    }
  })
  
  
  </script>
  
  <style lang="scss" scoped>
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .reupload {
      color: #409eff;
      cursor: pointer;
    }
  }
  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 560px;
    height: 250px;
    background-color: #f0f2f5;
    margin-right: 10px;
    border-radius: 4px;
    .tips-wrods{
      font-size: 14px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #2A2A2A;
      text-align: center;
    }
    .upload {
      text-align: center;
      margin-bottom: 24px;
    }
    .avatar-crop {
      width: 560px;
      height: 250px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .crop-box {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
      }
      video{
        max-width: 560px;
        max-height: 250px;
      }
    }
  }
  </style>
  
  
  