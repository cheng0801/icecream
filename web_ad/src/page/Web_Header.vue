<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left">
      <img class="logo" src="../assets/img/logo.svg" alt="" />
      <div class="web-title">公益特色</div>
      <div class="collapse-btn" @click="collapseChage" v-if="currentPath === '/manage'">
        <el-icon v-if="sidebar.collapse">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
        </el-icon>
      </div>

    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="btn-icon">
          <el-tooltip effect="dark" content="设置主题" placement="bottom">
            <i class="el-icon-lx-skin"></i>
          </el-tooltip>
        </div>
        <div class="btn-icon">
          <el-tooltip effect="dark" placement="bottom">
            <i class="el-icon-lx-notice"></i>
          </el-tooltip>
          <span class="btn-bell-badge"></span>
        </div>
        <!-- <RouterLink to="/">       -->
        <div class="btn-icon" v-if="currentPath === '/user_center'">
          <el-tooltip effect="dark" content="首页" placement="bottom">
            <i class="el-icon-lx-full"><el-icon :size="30">
                <House @click=" router.push('/')" />
              </el-icon></i>
          </el-tooltip>
        </div>
        <!-- </RouterLink> -->


        <div class="btn-icon" v-if="currentPath === '/manage'">
          <el-tooltip effect="dark" content="首页" placement="bottom">
            <i class="el-icon-lx-full"><el-icon :size="30">
                <House @click=" router.push('/')" />
              </el-icon></i>
          </el-tooltip>
        </div>


        <div class="btn-icon" v-if="currentPath === '/manage'">
          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <i class="el-icon-lx-full"><el-icon :size="30">
                <FullScreen @click="setFullScreen" />
              </el-icon></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <el-avatar class="user-avator" :size="30" :src="imgurl" @click="headerLogin" />
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ Info.userInfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="Info.userInfo.role === '管理员'" command="manage">系统管理</el-dropdown-item>

              <a href="https://github.com/cheng0801/icecream" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>

              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useSidebarStore } from "@/stores/m_sidebar";
import { useInfoStore, useTokenStore, } from "@/stores//userInfo";
import { useRouter, useRoute } from "vue-router";
// import imgurl from '../assets/img/img.jpg';

const Info = useInfoStore();
const imgurl = Info.userInfo.avatar

const token = useTokenStore();


const router = useRouter();
//获取当前路由
const route = useRoute()

const headerLogin = () => {
  if (Info.userInfo.username == '') {
    router.push('/log')
  } else if (Info.userInfo.username === undefined) {
    router.push('/log')
  } else {
    router.push('/user_center')
  }
}

const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
  sidebar.handleCollapse();
};

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage();
  }
});

// // 用户名下拉菜单选择事件

const currentPath = route.path;

console.log(currentPath)
//用户退出登录
const handleCommand = (command) => {
  if (command == "loginout") {
    token.saveToken();
    Info.remove()
    Info.saveInfo('')
    router.push("/log");
  } else if (command == "user") {
    router.push("/user_center");
  } else {
    router.push("/manage")
  }

};

const setFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen.call(document.body);
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  color: var(--header-text-color);
  background-color: var(--header-bg-color);
  // border-bottom: 1px solid #ddd;
  position: fixed;
  z-index: 99;
}

.header-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 100%;
}

.logo {
  width: 35px;
}

.web-title {
  margin: 0 40px 0 10px;
  font-size: 22px;
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.8;
  font-size: 22px;
}

.collapse-btn:hover {
  opacity: 1;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-icon {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--header-text-color);
  margin: 0 5px;
  font-size: 20px;
}

.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: var(--header-text-color);
}

.user-avator {
  margin: 0 10px 0 20px;
}

.el-dropdown-link {
  color: var(--header-text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-menu__item {
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
