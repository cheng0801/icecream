<script setup>
import { ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'

const item = {
  User: '2024-10-23',
  Id: 'web',
  Contents: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 100 }).fill(item))
</script>
<template>
  <el-container class="layout-container-demo" >


    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>
      
    <!-- <div class="filter-container" style="margin-bottom: 20px">
      <el-input maxlength="40" placeholder="用户名" style="width: 200px" v-model="searchContent"
        @keyup.enter="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchContList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-edit"
        @click="handleCreate">新增用户</el-button>
    </div> -->
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="User" label="User" width="140" />
            <el-table-column prop="Id" label="Id" width="120" />
            <el-table-column prop="Contents" label="Contents" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <!-- <div class="example-pagination-block">
    <div class="example-demonstration">When you have few pages</div>
    <el-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">When you have more than 7 pages</div>
    <el-pagination layout="prev, pager, next" :total="1000" />
  </div> -->
</template>



<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}


.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
