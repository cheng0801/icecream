<template>
  <el-config-provider :locale="zhCn">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-config-provider>

  <el-table :data="filterTableData" class="table-header" total="total">
    <el-table-column label="Name" prop="name" />
    <el-table-column label="Date" prop="date" />
    
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import My_Pagination from "../Pagination/my_Pagination.vue";

import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

interface User {
  date: string;
  name: string;
  address: string;
  total: string;
  pageSize: string;
  currentPage: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    total: "50",
    pageSize: "1",
    currentPage: "2",
  },

  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    total: "1",
    pageSize: "1",
    currentPage: "3",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    total: "1",
    pageSize: "1",
    currentPage: "4",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    total: "1",
    pageSize: "1",
    currentPage: "1",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    total: "1",
    pageSize: "1",
    currentPage: "1",
  },
];
</script>
<style scoped>
.table-header {
  width: 100;
  height: 800px;
}

.table-pagination {
  margin: 0 auto;
}
</style>
