<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-header">
        <img class="logo mr10" src="@/assets/img/logo.svg" alt="" />
        <div class="login-title">公益特色</div>
      </div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="large"
      >
        <el-form-item prop="username">
          <!-- autocomplete 是否显示 * -->
          <el-input v-model="ruleForm.username" autocomplete="off" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="on"
            placeholder="密码"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="on"
            placeholder="请确认密码"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item> -->
        <el-form-item type="email" prop="e_mail">
          <el-input v-model.number="ruleForm.e_mail" placeholder="邮箱">
            <template #prepend>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="mouse">
          <div>
            <input type="checkbox" v-model="ruleForm.ischeck" />
            已阅读并同意 <span>用户协议</span>和<span>隐私政策</span>
          </div>
        </el-form-item> -->
        <div class="btn">
          <el-button
            class="login-btn"
            type="primary"
            size="large"
            @click="submitForm(ruleFormRef)"
            >注册</el-button
          >
          <el-button class="login-btn" size="large" @click="resetForm(ruleFormRef)"
            >重填</el-button
          >
        </div>
        <p class="login-text">
          已有账号，
          <RouterLink class="RouterLink" :to="{ path: '/log' }">立即登录</RouterLink>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';


import {mypostData} from "@/utils/request";
import axios from 'axios';
// import router from "@/route"
const router = useRouter();
const sign = ref(true);

const ruleFormRef = ref<FormInstance>();

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === "") {
//     callback(new Error("请输入密码"));
//   } else {
//     if (ruleForm.checkPass !== "") {
//       if (!ruleFormRef.value) return;
//       ruleFormRef.value.validateField("checkPass");
//     }
//     callback();
//   }
// };
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "test111",
  password: "test111",
  // checkPass: "",
  e_mail: "zxcvasdf@qq.com",
  // ischeck: false,
});

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
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
  password: [
    // { validator: validatePass, trigger: "blur" },

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
  // checkPass: [
  //   { validator: validatePass2, trigger: "blur" },
  //   {
  //     min: 6,
  //     max: 30,
  //     message: "密码需为字母开头,且由6到30位字母或数字或下划线组成",
  //     trigger: "blur",
  //   },
  //   {
  //     pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/,
  //     message: "账号需为字母开头,且由6到30位字母或数字或下划线组成",
  //     trigger: "blur",
  //   },
  // ],

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




const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      // 检查用户是否同意协议
      // if (!ruleForm.ischeck) {
      //   alert("请阅读用户协议");
      //   return;
      // }

      // 构建要发送的数据
      const postData = JSON.stringify({
        ...ruleForm,        
      });
      // console.log('11111')
      console.log(postData);

      try {
        // 发送 POST 请求到后端
        const response = await mypostData("api/register", postData);
        console.log(response);
        // 根据后端的响应处理结果
        if (response.data.code==200) {
            ElMessage.success('注册成功，请登录')
          // 可能需要执行其他操作，如跳转到登录页面
        } else {
          alert("注册失败: " + response.data.message);
          // 可能需要显示更详细的错误信息
        }
      } catch (error) {
        // 处理请求错误
        console.error("注册时发生错误:", error);
        alert("注册失败，请稍后再试。");
      }
    } else {
      alert("注册失败，请检查表单输入。");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(@/assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  width: 35px;
}

.login-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.login-container {
  width: 450px;
  border-radius: 5px;
  background: #fff;
  padding: 40px 50px 50px;
  box-sizing: border-box;
}

.mouse {
  margin-top: -25px;
  float: right;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  //  background-color: aqua;
  .login-btn {
    display: block;
    width: 25%;
  }
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
  text-decoration: none;
}

.RouterLink {
  text-decoration: none;
  color: #409eff;
  font-weight: bold;
}

.RouterLink:hover {
  color: #057ef8;
  font-weight: bold; /* 鼠标悬停时链接的颜色 */
  text-decoration: underline; /* 添加下划线 */
}

.RouterLink:active {
  color: #055bb1; /* 点击链接时的颜色 */
}

.RouterLink:focus {
  outline: 1px solid #076ad4; /* 获取焦点时的轮廓线 */
}
</style>
