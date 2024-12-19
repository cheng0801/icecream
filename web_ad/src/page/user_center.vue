<template>
  <!-- 个人中心 -->
  <div classs="box">
    <Web_Header />
    <div class="user-container">
      <el-card class="user-profile" shadow="hover" :body-style="{ padding: '0px' }">
        <div class="user-profile-bg"></div>
        <div class="user-avatar-wrap">
          <UserAvatar :avatar="Info.avatar" />
        </div>
        <div class="user-info">
          <div class="info-name">{{ Info.username }}</div>
          <div class="info-desc">
            <span>@cheng</span>
            <el-divider direction="vertical" />
            <el-link href="https://github.com/cheng0801/icecream" target="_blank">icecream</el-link>
          </div>
          <div class="info-desc">公益特色</div>
          <div class="info-icon">
            <a href="https://github.com/lin-xin" target="_blank">
              <i class="el-icon-lx-github-fill"></i></a>
            <i class="el-icon-lx-qq-fill"></i>
            <i class="el-icon-lx-facebook-fill"></i>
            <i class="el-icon-lx-twitter-fill"></i>
          </div>
        </div>
        <div class="user-footer">
          <div class="user-footer-item">
            <el-statistic title="Follower" :value="1800" />
          </div>
          <div class="user-footer-item">
            <el-statistic title="Following" :value="666" />
          </div>
          <div class="user-footer-item">
            <el-statistic title="Total Post" :value="888" />
          </div>
        </div>
      </el-card>
      <el-card class="user-content" shadow="hover"
        :body-style="{ padding: '20px 50px', height: '100%', boxSizing: 'border-box' }">
        <el-tabs tab-position="left" v-model='activeName' >
          <el-tab-pane name="label1" label="个人信息"  class="user-tabpane">
           <div v-if="activeName==='label1'">111</div>
          </el-tab-pane>
          <el-tab-pane name="label2" label="修改密码" class="user-tabpane">
           
            <el-form v-if="activeName==='label2'" ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
              label-position="top" label-width="auto" class="w500" size="large" >
              <el-form-item label="旧密码：">
              <el-input :type="flagType.flagType === 'password' ? 'password' : 'text'" v-model="ruleForm.old"
                @focus="handleFocusOldPassword">
                <!-- 添加一个图标用于切换密码可见性 -->
                <template #suffix>
                  <el-icon :class="[flagType.flagType === 'password' ? 'el-icon-eye-off' : 'el-icon-eye']"
                    style="cursor: pointer" @click="toggleOldPasswordVisibility">
                    <el-icon v-if="flagType.flagType === 'password'"><View /></el-icon>
                    <el-icon v-else><Hide /></el-icon>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
             
              <el-form-item label="新密码：">
                <el-input :type=flagType.flagType v-model="ruleForm.password">
                  
                  <template #suffix>
                  <el-icon :class="[flagType.flagType === 'password' ? 'el-icon-eye-off' : 'el-icon-eye']"
                    style="cursor: pointer" @click="toggleOldPasswordVisibility">
                    <el-icon v-if="flagType.flagType === 'password'"><View /></el-icon>
                    <el-icon v-else><Hide /></el-icon>
                  </el-icon>
                </template>
                </el-input>
              </el-form-item>
              <el-form-item label="确认新密码：">
                <el-input :type=flagType.flagType v-model="ruleForm.checkPass">
                  
                  <template #suffix>
                  <el-icon :class="[flagType.flagType === 'password' ? 'el-icon-eye-off' : 'el-icon-eye']"
                    style="cursor: pointer" @click="toggleOldPasswordVisibility">
                    <el-icon v-if="flagType.flagType === 'password'"><View /></el-icon>
                    <el-icon v-else><Hide /></el-icon>
                  </el-icon>
                </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                  保存
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="ucenter">
import Web_Header from "./Web_Header.vue";
import type { FormInstance, FormRules } from "element-plus";
// import user_avatar from "@/components/user_center/user_avatar.vue";

import { reactive, ref } from "vue";
import request from "@/utils/request";
import { useInfoStore } from "@/stores/userInfo";


import { useRouter } from "vue-router";


import UserAvatar from "@/components/user_center/user_avatar.vue";
// https://img2.baidu.com/it/u=2563189020,3546676907&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1432

// import imgurl from '../assets/img/img.jpg';
const activeName = ref('lable1')

const flagType = ref({ flagType: 'password' });
const showPassword = ref(false);

// 切换旧密码可见性的函数
const toggleOldPasswordVisibility = () => {
  flagType.value.flagType = flagType.value.flagType === 'password' ? 'text' : 'password';
};

// 切换新密码可见性的函数
const toggleNewPasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// 处理旧密码输入框聚焦事件的函数
const handleFocusOldPassword = () => {
  // ... 处理旧密码输入框聚焦时的逻辑
};

// 处理新密码输入框聚焦事件的函数
const handleFocusNewPassword = () => {
  // ... 处理新密码输入框聚焦时的逻辑
};



const Info = useInfoStore().userInfo;



// const name = localStorage.getItem("vuems_name");
const router = useRouter();

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
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

const isLoading = ref(false);
const ruleForm = reactive({
  password: "qwe123",
  checkPass: "qwe123",
  old: "qwe123",
});

const { password } = ruleForm;
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [
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
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  isLoading.value = true;

  try {
    // 触发表单验证
    await formEl.validate(async (valid) => {
      if (valid) {
        // 如果验证通过，发送请求
        //结构数据
        // const data = {
        //   password: ruleForm.password,
        // };
        const { password } = ruleForm;
        const response = await request.patch("user/0801", { password });
        isLoading.value = false;
        ElMessage.success("修改成功，请重新登陆！");
        router.push({ name: "log" });
      }
    });
  } catch (error) {
    // 处理请求错误
    ElMessage.error("修改密码失败，请检查输入！");
    console.error("修改密码时发生错误:", error);
  }
};




</script>

<style scoped>
.user-avatar-wrap {
  height: 300px;
  width: 300px;
}

.box {
  height: 100%;
}

.user-container {
  position: absolute;
  top: 70px;
  height: 89%;
  display: flex;
}

.user-profile {
  position: relative;
}

.user-profile-bg {
  width: 100%;
  height: 200px;
  background-image: url("@/assets/img/ucenter-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.user-profile {
  width: 500px;
  margin-right: 20px;
  flex: 0 0 auto;
  align-self: flex-start;
}

.user-avatar-wrap {
  position: absolute;
  top: 135px;
  width: 100%;
  text-align: center;
}

.user-avatar {
  border: 5px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 7px 12px 0 rgba(62, 57, 107, 0.16);
}

.user-info {
  text-align: center;
  padding: 80px 0 30px;
}

.info-name {
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 500;
  color: #373a3c;
}

.info-desc {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.info-desc,
.info-desc a {
  font-size: 18px;
  color: #55595c;
}

.info-icon {
  margin-top: 10px;
}

.info-icon i {
  font-size: 30px;
  margin: 0 10px;
  color: #343434;
}

.user-content {
  flex: 1;
}

.user-tabpane {
  padding: 10px 20px;
}

.crop-wrap {
  width: 600px;
  height: 350px;
  margin-bottom: 20px;
}

.crop-demo-btn {
  position: relative;
}

.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.w500 {
  width: 500px;
}

.user-footer {
  display: flex;
  border-top: 1px solid rgba(83, 70, 134, 0.1);
}

.user-footer-item {
  padding: 20px 0;
  width: 33.3333333333%;
  text-align: center;
}

.user-footer>div+div {
  border-left: 1px solid rgba(83, 70, 134, 0.1);
}
</style>

<style>
.el-tabs.el-tabs--left {
  height: 100%;
}
</style>
