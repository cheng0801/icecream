<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="reset-title">重置密码</div>
      <p class="reset-text">输入你的邮箱，我们将发送重置密码邮件</p>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        size="large"
      >
        <el-form-item type="email" prop="e_mail">
          <el-input v-model.number="ruleForm.e_mail" placeholder="邮箱">
            <template #prepend>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
          >发送邮件</el-button
        >
        <p class="login-text">
          <!-- <el-link type="primary" @click="$router.push('/login')">返回登录</el-link> -->
          <!-- <el-link type="primary" to="{ path: '/log'} ">返回登录</el-link> -->
          <RouterLink class="RouterLink" :to="{ path: '/log'}">返回登录</RouterLink>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import request from "@/utils/request";
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    e_mail: "",
  });

  const rules = reactive<FormRules<typeof ruleForm>>({

    e_mail: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "请输入正确邮箱",
        trigger: "blur",
      },
    ]
  });



const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {


      // 构建要发送的数据
      const postData = {
        ...ruleForm,
        
      };

      try {
        // 发送 POST 请求到后端
        const response = await request.post("users", {
           user_info:postData,
        });

        
        
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
</script>

<style scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.reset-title {
  text-align: center;
  font-size: 22px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.reset-text {
  text-align: center;
  font-size: 14px;
  color: #787878;
  margin-bottom: 40px;
}

.login-container {
  width: 450px;
  border-radius: 5px;
  background: #fff;
  padding: 40px 50px 50px;
  box-sizing: border-box;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-text {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  
}

.RouterLink {
		text-decoration: none;
    color:#409eff;
    font-weight: bold;
        
	}

  
.RouterLink:hover {
  color: #057ef8;
  font-weight: bold;/* 鼠标悬停时链接的颜色 */
  text-decoration: underline; /* 添加下划线 */
}

.RouterLink:active {
  color: #055bb1; /* 点击链接时的颜色 */
}


</style>
