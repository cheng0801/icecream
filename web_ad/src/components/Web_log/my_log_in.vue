x
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import request from "@/utils/request";
import { useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>();

const router = useRouter();

const validateId = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    if (ruleForm.username !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("username");
    }
    callback();
  }
};
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
  username: "",
  pass: "",
  checkPass: "",
  // tele: "",
  ischeck: false,
});

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    { validator: validatePass, trigger: "blur" },
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
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (ruleForm.ischeck === true) {
    if (!formEl) return;
    try {
      // 触发表单验证
      await formEl.validate(async (valid) => {
        if (valid) {
          // 如果验证通过，发送登录请求

          const response = await request.post("users", {
            username: ruleForm.username,
            password: ruleForm.pass,
          });

          // 处理响应
          if (valid /*response.data.success*/) {
            // 登录成功，可以根据需要跳转到其他页面或显示成功消息
            alert("登录成功!");
            // 例如，使用 vue-router 跳转
            router.push({ name: "home" });
          } else {
            // 登录失败，显示错误信息
            alert("登录失败: " + response.data.message);
          }
        } else {
          // 验证失败，显示验证错误信息
          alert("登录失败，请检查表单输入。");
        }
      });
    } catch (error) {
      // 处理请求错误
      console.error("登录时发生错误:", error);
      alert("登录失败，请稍后重试。");
    }
  } else {
    // 未同意用户协议，显示提示信息
    alert("请阅读并同意用户协议。");
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="home">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
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
      <el-form-item label="">
        <div class="mouse">
          <input type="checkbox" v-model="ruleForm.ischeck" />
          已阅读并同意 <span>用户协议</span>和<span>隐私政策</span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitForm(ruleFormRef)"> 登录 </el-button>

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
