<script setup lang="ts">
import { ref, onMounted, reactive,computed } from "vue";
import { useRoute } from "vue-router";
import { getPosts } from "@/api"; // 假设 getPosts 现在负责处理 ID 参数并返回正确的数据
import { getData } from "@/utils/request";
// import Wang_Editer from "@/components/Wang_Editer.vue";
import { usePostStore } from "@/stores/user_posts";
import { getUserId } from "@/utils/auth";
const user_Id = Number(getUserId())
const userposts = usePostStore()
const route = useRoute();
const postId = route.params.id; // 假设 URL 参数中有一个名为 'id' 的参数
const mposts = ref({
  title: '',
  describe: '',
  user_id: 0
}); // 初始化为 null，表示数据尚未加载

import { posts } from "@/api";

import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()



const ruleForm = reactive({
  title: '',
  describe: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  title: [{
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
      const { title, describe } = ruleForm;
      console.log({ title, describe });
      // 发送 POST 请求到后端
      posts(12191, { title, describe });
      ElMessage.success("修改成功")
    } else {
      console.log('error submit!')
    }
  })
}
// getData('/api/theme/detail_'+postId).then((res) => {
//   if (res.data[0].status === 200) {
//     console.log(res.data[0]);
//     const { status, data_theme } = res.data[0]
//     console.log(data_theme[3]);
//     userposts.savePost(data_theme[3])
//     mposts.value = data_theme[3]; // 假设 res.data 是一个包含 title 和 content 的对象
//     ruleForm.title = mposts.value.title
//     ruleForm.describe = mposts.value.describe
//     // console.log(userposts.userPost.user_id,"id");
//   } else {
//     console.error("Failed to load post data:", res);
//     // mposts.value = {}; // 或者显示一个错误消息的对象
//   }
// }).catch((error) => {
//   console.error("Error loading post data:", error);
//   // mposts.value = {}; // 或者显示一个错误消息的对象
// });

getData('/api/theme/detail_'+postId).then((res) => {
  if (res.data.status === 200) {
    console.log(res.data);
    const { status, data_theme } = res.data
    console.log(data_theme);
    userposts.savePost(data_theme)
    mposts.value = data_theme; // 假设 res.data 是一个包含 title 和 content 的对象
    ruleForm.title = mposts.value.title
    ruleForm.describe = mposts.value.describe
    // console.log(userposts.userPost.user_id,"id");
  } else {
    console.error("Failed to load post data:", res);
    // mposts.value = {}; // 或者显示一个错误消息的对象
  }
}).catch((error) => {
  console.error("Error loading post data:", error);
  // mposts.value = {}; // 或者显示一个错误消息的对象
});
const isEdit=computed(() => {
return userposts.userPost.user_id == user_Id
})
const isZhidu=computed(() => {
return userposts.userPost.user_id == user_Id
})
onMounted(() => {
  getData()
  // console.log(mposts.value.user_id, user_Id,mposts.value.user_id == user_Id);
});
</script>

<template>


  <el-main>

    <!-- <div> 
    <div class="my-top" v-if="mposts">
        <span>{{ mposts.title }}</span>
    </div>
    <div class="my-line"></div>
    <el-container class="box">  
      <div class="my-content" v-if="mposts">
        <span v-html="mposts.describe"></span>
      </div>
    </el-container>
  </div> -->
    <!-- <div>
      <el-form ref="ruleFormRef" v-model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <div class="my-top" >
        <el-form-item prop="title">
          <el-input v-model="ruleForm.title" placeholder="标题" :disabled="mposts.user_id === 2"/>
        </el-form-item>
      </div>
      <div class="my-line"></div>

      <el-container class="box">  
      <div class="my-content" >
        <el-form-item v-model="ruleForm.describe">
          <Wang_Editer   v-model="ruleForm.describe" :isEdit="mposts.user_id === 1"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            修改
          </el-button>
        </el-form-item>
      </div>
    </el-container>
  </el-form>
  </div> -->

    <div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <div class="my-top">
          <el-form-item prop="title">
            <!-- {{ user_Id }}+{{ userposts.userPost.user_id !== user_Id }}+
            {{ userposts.userPost.user_id }}+
            {{ console.log(typeof userposts.userPost.user_id, typeof user_Id) }}             -->
            <el-input v-model="ruleForm.title" placeholder="标题" :disabled="userposts.userPost.user_id !== user_Id"
              style="width:95%" />
          </el-form-item>
        </div>
        <div class="my-line"> </div>
        
        <el-container class="box">
          <div class="my-content">
            <el-form-item>
              <!-- +{{ userposts.userPost.user_id }}+ {{ user_Id }} + {{ isEdit }}+{{ isZhidu}}+ -->
              <Wang_Editer v-model="ruleForm.describe" :isEdit="isEdit"
                :isReadonly="isZhidu" />
            </el-form-item>
            <el-form-item v-if="userposts.userPost.user_id == user_Id">
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                修改
              </el-button>
            </el-form-item>
          </div>
        </el-container>
      </el-form>
    </div>


    <!-- <div class="my-line"></div>
      <el-container class="box">
        <div class="my-content" v-if="mposts">
      使用 v-html 渲染描述，但注意安全性，避免 XSS 攻击 
          <span v-html="mposts.describe"></span>
          <Wang_Editer v-model="ruleForm.content" :isEdit="mposts.user_id === 2" /> -->
    <!-- 当 mposts.id 为 1 时显示编辑框 -->
    <!-- <div v-if="mposts.user_id === 1"> -->
    <!-- 
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
              <el-form-item prop="title">
                <el-input v-model="ruleForm.title" placeholder="标题" />
              </el-form-item>
              <el-form-item>
                <Wang_Editer v-model="ruleForm.content" :fatie="fatie" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                  修改
                </el-button>

              </el-form-item>
            </el-form> -->

    <!-- <Wang_Editer />
          <el-input
            v-model="mposts.title"
            placeholder="编辑标题"
            style="margin-top: 10px;"
          ></el-input>
          <el-input
            type="textarea"
            v-model="mposts.describe"
            placeholder="编辑描述"
            style="margin-top: 10px;"
          ></el-input>
          <el-button type="success" @click="savePost">保存</el-button>
          <el-button type="warning" @click="cancelEdit">取消</el-button> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </el-container> -->

  </el-main>
  <!-- <el-main>
    <div>
      <div class="my-top" v-if="mposts">
        <el-input v-model="mposts.title" placeholder="请输入标题"></el-input>
      </div>
      <div class="my-line"></div>
      <el-container class="box">
        <div class="my-content" v-if="mposts">
          <el-textarea v-model="mposts.describe" placeholder="请输入描述"></el-textarea>
        </div>
      </el-container>
    </div>
  </el-main> -->
</template>


<style lang="scss" scoped>
.el-main {
  width: 80%;
  background-color: rgb(194, 202, 199);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.box {
  display: flex;
  flex-direction: column;
  /* 设置为列方向布局 */
  align-items: center;
  /* 实现水平居中（在列布局中主要用于子项垂直对齐，但此处配合flex-direction: column使用，确保内容不紧贴边缘） */
  height: 100%;
  /* 设置容器高度为视口高度 */
  width: 100%;
  /* 确保容器宽度充满父元素 */
  padding: 15px;
  /* 可选：为内容添加内边距 */
  left: 0;
  box-sizing: border-box;
  /* 确保内边距和边框不会增加额外宽度 */
  font-size: 20px;
  overflow-x: hidden;
  width: 100%;
}

.my-top {
  height: 40px;
  width: 100%;
  margin: 5px;

  span {
    margin: 0 auto;

    font-size: 20px;
    font-weight: 700;
    color: rgb(112, 104, 104);
  }

  /* background-color: aquamarine; */
}

.my-line {
  height: 2px;
  width: 100%;

  background-color: rgb(165, 153, 153);
}

.my-content {
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(202, 205, 211);
}

.el-input {
  width: 500px;
  height: 35px;
  margin: 5px;
  font-size: 18px;
  font-weight: 900;
}
</style>
