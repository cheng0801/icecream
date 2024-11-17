<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
const userInfo = reactive({
  list: [],
});
const data = userInfo.list;
async function fetchUserInfo() {
  try {
    const res = await axios.get("http://localhost:3000/users");

    userInfo.list = res.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <el-aside>
    <el-container class="box">
      <div class="content-center">
        <div class="aside-header">
          <div class="ck">
            <el-breadcrumb class="ck" separator="|">
              <el-breadcrumb-item :to="{ path: '/' }">
                查看：<span class="ck-red">{{ data.gold }}</span></el-breadcrumb-item
              >
              <el-breadcrumb-item :to="{ path: '/' }">
                回复：<span class="hf-red">{{ data.gold }}</span></el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
        </div>
        <div class="user-line"></div>
        <div class="id-container">
          <span class="id">{{ data.title }}</span>
        </div>
        <div class="avatar">
          <el-avatar :size="150">
            <!-- 头像 -->
            <img src="@/assets/img/user/aside_img.jpg" alt="头像加载失败" />
          </el-avatar>
        </div>
        <div>
          <table>
            <tr>
              <td>{{ userInfo.theme }}</td>
              <td>{{ userInfo.posts }}</td>
              <td>{{ userInfo.integral }}</td>
            </tr>
            <tr>
              <td>主题</td>
              <td>贴子</td>
              <td>积分</td>
            </tr>
          </table>
          <div></div>
        </div>
      </div>
    </el-container>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  width: 20%;
  height: 500px;
  overflow-y: hidden;
  background-color: rgb(240, 234, 234);
  .box {
    display: flex;
    flex-direction: column; /* 设置为列方向布局 */
    align-items: center; /* 实现水平居中（在列布局中主要用于子项垂直对齐，但此处配合flex-direction: column使用，确保内容不紧贴边缘） */
    height: 100%; /* 设置容器高度为视口高度 */
    width: 100%; /* 确保容器宽度充满父元素 */
    padding: 10px; /* 可选：为内容添加内边距 */
    left: 0;
    box-sizing: border-box; /* 确保内边距和边框不会增加额外宽度 */
    font-size: 20px;

    overflow-x: hidden;
    .content-center {
      display: flex;
      flex-direction: column; /* 子容器也设置为列方向布局 */
      align-items: center; /* 子容器内容水平居中（在列布局中主要用于垂直方向的对齐） */
      width: 100%; /* 子容器宽度充满父容器 */
      text-align: center; /* 确保文本内容水平居中 */
      overflow-x: hidden;
      .aside-header {
        height: 40px;
        display: flex;
        flex-direction: column; /* 子容器也设置为列方向布局 */
        align-items: center; /* 子容器内容水平居中（在列布局中主要用于垂直方向的对齐） */
        width: 100%; /* 子容器宽度充满父容器 */
        text-align: center; /* 确保文本内容水平居中 */
        overflow-x: hidden;
        .ck {
          margin: 5px;
          color: black;
          font-size: 15px;
          .ck-red {
            color: red;
          }
          .hf-red {
            color: red;
          }
        }
      }
      .user-line {
        height: 2px;
        width: 200px;
        margin-bottom: 0;
        background-color: rgb(165, 153, 153);
      }
    }
    .img {
      height: 100px;
      width: 100px;
      // margin-top: 20px; /* 调整图片上方间距 */
    }
  }
}

table {
  width: 100%;
  font-size: 15px;
  margin: 20px auto;
  border-collapse: collapse; /* 合并边框，使得内边框显示效果更好 */
  td {
    padding: 2px;
    border: 2px solid rgb(114, 103, 103); /* 设置表格、表头和单元格的外边框，但不会影响内边框效果 */
  }
  td:first-child,
  td:last-child {
    border-left: none; /* 移除首个单元格的左侧边框 */
    border-right: none;
  }
  td:first-child,
  td:nth-child(2),
  td:last-child {
    border-top: none; /* 移除首个单元格的左侧边框 */

    border-bottom: none;
  }
  tr:nth-child(2) {
    color: grey;
  }
}

.id-container {
  margin-top: 10px; /* 调整Id上方间距 */
}

.avatar {
  margin-top: 20px; /* 调整头像上方间距 */
}
</style>
