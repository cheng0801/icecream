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
        <Wang_Editer v-model="ruleForm.posts" />
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        发帖
      </el-button>
      
    </el-form-item>
  </el-form>

</template>

<script setup lang="ts">

import { posts } from "@/api";

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()





const ruleForm = reactive({
  title: '',
  posts: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  title: [ {
      min: 1,
      max: 80,
      message: "标题由1到80位组成",
      trigger: "blur",
    },],

})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
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
