<template>
  <div class="login-bg">
    <div class="login-container">
      <router-link to="/" class="toWeb">
        <el-icon :size="20">
          <HomeFilled />
        </el-icon>
      </router-link>
      <div class="login-content">

        <div class="login-header">
          <img class="logo mr10" src="@/assets/img/logo.svg" alt="" />
          <div class="login-title">公益特色</div>
        </div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
          label-width="auto" size="large">
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
            <el-input v-model="ruleForm.password" type="password" autocomplete="on" placeholder="密码">
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="pwd-tips">
            <el-checkbox class="pwd-checkbox" v-model="checked" label="记住密码" />
            <RouterLink class="RouterLink" :to="{ path: '/rest_psd' }">忘记密码</RouterLink>
          </div>

          <div class="btn">
            <el-button class="login-btn" type="primary" size="large" @click="submitForm(ruleFormRef)"
              :loading="isLoading">登录</el-button>
            <el-button class="login-btn" size="large" @click="resetForm(ruleFormRef)">重填</el-button>
          </div>
          <p class="login-text">
            没有账号？
            <RouterLink class="RouterLink" :to="{ path: '/sign' }">立即注册</RouterLink>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { type ElAlert, type FormInstance, type FormRules, ElMessage } from "element-plus";
import { RouterLink, useRouter } from "vue-router";
import { login } from "@/api";
import { setToken, setUserId } from "@/utils/auth";

import { useTokenStore, useInfoStore } from '@/stores/userInfo'
import { getData } from "@/utils/request";

const tokenStore = useTokenStore()
const userInfoStore = useInfoStore()
const ruleFormRef = ref<FormInstance>();

const router = useRouter();


const lgStr = localStorage.getItem('login-param');
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);



//设置登录状态，避免重复点击
const isLoading = ref(false)

const ruleForm = reactive({
  username: defParam ? defParam.username : '',
  password: defParam ? defParam.password : '',

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


});

const submitForm = async (formEl: FormInstance | undefined) => {
  isLoading.value = true
  if (!formEl) return;
  try {
    // 触发表单验证
    await formEl.validate(async (valid) => {
      if (valid) {
        // 如果验证通过，发送登录请求
        const postData = JSON.stringify({
          ...ruleForm,
        })

        const response = await login(postData);
        // const response= await getData('user/1219');
        // const {status,message,data}=response.data
        // console.log(response.data, "登录响应数据");
        const { data, code } = response.data;

        // console.log(data.token)

        //缓存token
        //封装
        // 处理响应
        if (response.data.code === 200) {
          // if (res.data.status === 1) {
          // 登录成功，可以根据需要跳转到其他页面或显示成功消息
          //改变登录状态
          isLoading.value = false
          // //  存用户信息
          // console.log(res.data.message);
          // userInfoStore.saveInfo(res.data)
          setUserId(data.userID)
          tokenStore.saveToken(data.token);
          // console.log(data.token);
          setToken(data.token);
          // 使用 vue-router 跳转
          router.push({ name: "home" });
          //记住密码后保存
          if (checked.value) {
            localStorage.setItem('login-param', postData);
          } else {
            localStorage.removeItem('login-param');
          }
          ElMessage.success('登录成功')
        } else {
          //改变登录状态
          isLoading.value = false
          // 登录失败，显示错误信息
          // ElMessage.success("登录成功 " + response.data.message);
        }
      } else {
        // 验证失败，显示验证错误信息
        alert("登录失败，请检查输入。");
      }
      // setToken(token);
      // console.log(sessionStorage.token);
      // 未封装
      // sessionStorage.setItem('token',token);
      //跳转首页
      // router.push({ name: "home" });
    })
    // const response = await request.post("users", {
    //   username: ruleForm.username,
    //   password: ruleForm.pass,
    // });

    // // 处理响应
    //   if (valid /*response.data.code === 0*/) {
    //     // 登录成功，可以根据需要跳转到其他页面或显示成功消息
    //     ElMessage.success('登录成功')
    //     // 例如，使用 vue-router 跳转
    //     router.push({ name: "home" });
    //   } else {
    //     // 登录失败，显示错误信息
    //     ElMessage.success("登录失败: " + response.data.message);
    //   }
    // } else {
    //   // 验证失败，显示验证错误信息
    //   alert("登录失败，请检查输入。");
    // }
    // });
  } catch (error) {
    isLoading.value = false
    // 处理请求错误
    ElMessage.error('登录失败，请检查输入！')
    console.error("登录时发生错误:", error);

  }

}

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

.login-content {
  padding: 40px 50px 50px;
  box-sizing: border-box;

}

.toWeb {
  color: rgb(243, 170, 170);
  top: 10px;
  margin-left: 10px;
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
  padding-top: 10px;
}


.mouse {
  margin-top: -25px;
  float: right;
}

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: 30px 0 10px;
  color: #787878;
}

.pwd-checkbox {
  height: auto;
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
}

.RouterLink {
  text-decoration: none;
  color: #409eff;
  font-weight: bold;
}

.RouterLink:hover {
  color: #057ef8;
  font-weight: bold;
  /* 鼠标悬停时链接的颜色 */
  text-decoration: underline;
  /* 添加下划线 */
}

.RouterLink:active {
  color: #055bb1;
  /* 点击链接时的颜色 */
}

.RouterLink:focus {
  outline: 2px solid #076ad4;
  /* 获取焦点时的轮廓线 */
}
</style>
