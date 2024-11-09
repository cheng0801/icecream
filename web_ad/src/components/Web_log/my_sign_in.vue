<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const sign = ref(true);


const ruleFormRef = ref<FormInstance>();


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};


const ruleForm = reactive({
  id: "",
  pass: "",
  checkPass: "",
  tele: "",
  e_mail: "",
  ischeck: false,
});

const rules = reactive<FormRules<typeof ruleForm>>({
  id: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 6,
      max: 30,
      message: "账号需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/,
      message: "账号需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
  ],
  pass: [
    { validator: validatePass, trigger: "blur" },

    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 30,
      message: "密码需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/,
      message: "密码需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
  ],
  checkPass: [
    { validator: validatePass2, trigger: "blur" },
    {
      min: 6,
      max: 30,
      message: "密码需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/,
      message: "账号需为字母开头,且由6到30位字母或数字或下划线组成",
      trigger: "blur",
    },
  ],

  // tele: [
  //   { required: true, message: "请输入电话号码", trigger: "blur" },
  //   { pattern: /^1\d{10}$/, message: "电话号码需为1开头的11位数字", trigger: "blur" },
  // ],

  e_mail: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "请输入正确邮箱",
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (ruleForm.ischeck === true){
  if (!formEl) return;
  formEl.validate((valid) => { 
    if (valid) {
      alert("注册成功!");
    } else {
      alert("注册失败!");
    }
  });
} else {
  alert('请阅读用户协议')
}
};
 

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>

<template>
  <div v-show="sign" class="home">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="id">
        <!-- autocomplete 是否显示 * -->
        <el-input v-model="ruleForm.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="on" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="电话" prop="tele">
        <el-input v-model.number="ruleForm.tele" />
      </el-form-item> -->
      <el-form-item label="邮箱" type="email" prop="e_mail">
        <el-input v-model.number="ruleForm.e_mail" />
      </el-form-item>
      <el-form-item label="" >
       
        <div class="mouse">
          <input type="checkbox"  v-model="ruleForm.ischeck" />
        已阅读并同意 <span>用户协议</span>和<span>隐私政策</span></div>
      </el-form-item>

      <el-form-item>
        
        <el-button @click="submitForm(ruleFormRef)"> 注册 </el-button>
        <el-button @click="resetForm(ruleFormRef)">重填</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

.demo-ruleForm {
  margin: 10% auto;
}

.el-button {
  margin: 0 auto;
}


.mouse {
  margin: 0 auto;
}
</style>
