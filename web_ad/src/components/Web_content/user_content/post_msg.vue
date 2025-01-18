<template>

<el-form
    ref="ruleFormRef" 
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item prop="title">
      <el-input v-model="ruleForm.title"   placeholder="标题"/>
    </el-form-item>
    <el-form-item>
        <Wang_Editer v-model="ruleForm.describe" />
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{fatie}}
      </el-button>
      
    </el-form-item>
  </el-form>

</template>

<script setup lang="ts">

import { posts } from "@/api";
import { mypostData } from "@/utils/request";
import { reactive, ref,defineProps } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'


import { getToken } from "@/utils/auth";
const user_token=getToken()
const ruleFormRef = ref<FormInstance>()

const prop=defineProps({
  fatie:{
    type:String,
    default:"发新帖"
  }
})



const ruleForm = reactive({
  title: '',
  describe: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  title: [ {
      min: 1,
      max: 30,
      message: "标题由8到40位组成",
      trigger: "blur",
    },],
    describe: [ {
      min: 1,
      max: 4000,
      message: "内容由8到4000位组成",
      trigger: "blur",
    },],

})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
     const postDATA = JSON.stringify({
          ...ruleForm,
        })
// console.log({ title,content});
  // 发送 POST 请求到后端
  mypostData("api/user/add/?token="+user_token,postDATA);
  
  console.log(postDATA);
    } else {
      console.log('error submit!')
    }
  })
}



 

// });
// const submitForm = async () => {
//   // 构建要发送的数据
//   const postData = form.test;

//   // 发送 POST 请求到后端
//   await posts(postData);
// };
</script>
<style scoped>
.el-input {
  width: 500px;
  height: 35px;
  margin: 5px;
  font-size: 18px;
  font-weight: 900;
}
</style>
