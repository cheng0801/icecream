<template>
  <div class="wrapper">
    <Web_Header class="web-header"/>
    <M_sidebar />    
    <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
      <v-tabs></v-tabs>
      <div class="content">     
        <router-view v-slot="{ Component }">
          <TransitionGroup name="move" mode="out-in">
            <keep-alive :include="tabs.nameList">
              <component :is="Component"></component>
            </keep-alive>
          </TransitionGroup>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import M_sidebar from "../components/manage/m_sidebar.vue";
import Web_Header from "./Web_Header.vue";
import vTabs from '@/components/manage/m_tabs.vue';

import { useSidebarStore } from "@/stores/m_sidebar";
import { useTabsStore } from "@/stores/m_tabs";


// import vSidebar from '@/components/sidebar.vue';


const sidebar = useSidebarStore();
const tabs = useTabsStore();
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}

.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 71px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #eef0fc;
  overflow: hidden;
}

.content {
  width: auto;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content::-webkit-scrollbar {
  width: 0;
}

.content-collapse {
  left: 65px;
}
</style>
