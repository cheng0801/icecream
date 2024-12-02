<template>
  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="role" label="role" />
  </el-table>

  <div class="demo-pagination-block">
    <my_Pagination :total="total" :currentPage="currentPage" :pageSize="pageSize"
          layout=" prev, pager, next,sizes,jumper"  @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange" />


  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import request from "@/utils/request";
import my_Pagination from "@/components/Pagination/my_Pagination.vue";
const currentPage = ref(8)
const total = ref(1000)
const pageSize = ref(11)
 
const handleSizeChange = (ref) => {
  console.log(ref, '父组调用Size方法')
  pageSize.value = ref
  updateTableData()
}
const handleCurrentChange = (ref) => {
  console.log(ref, '父组件调用Current方法')
  currentPage.value = ref
  updateTableData()
}

import { fetchUserData } from "@/api";
const updateTableData = () => {
  const start = (currentPage.value - 1) *pageSize.value;
  const end = start +pageSize.value;

  const getData = async () => {
  const res = await fetchUserData();
  // console.log(res);
  tableData.list = res.data.slice(start,end);
  total.value = res.data.length;
};
getData()
}

// 声明响应式变量
const userInfo = reactive({
  list: [],
  // 假设后端会返回total字段来表示总记录数
  // total: 0, // 这行暂时保留，但应该从后端获取
});

// const paginationData = reactive({
//   pageNum: 1, //页码
//   pageSize: 10, //每页多少条
// });

const tableData = reactive({
  list: [],
  total: 0, // 初始化total为0，稍后从后端获取或计算
});

// //异步
async function fetchUserInfo() {
  try {
    const res = await request.get("user");

    userInfo.list = res.data /*|| res.data*/; // 假设后端返回的数据中有一个items字段，或者直接是数据数组
console.log(res.data);
tableData.list=userInfo.list

    tableData.total = res.data.total || userInfo.list.length; // 从后端获取total，或者如果后端不提供，则使用列表长度（但这通常不是正确的做法，因为列表可能只包含当前页的数据）
    console.log( tableData.total);
    console.log( tableData.list);

    // updateTableData();
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}


onMounted(() => {
  fetchUserInfo();
});
</script>

<style>
/* 你可以在这里添加样式 */
</style>
