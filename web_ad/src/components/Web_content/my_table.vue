<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import axios from "axios";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const userInfo = reactive({
  list: [],
  // 假设后端会返回total字段来表示总记录数
  // total: 0, // 这行暂时保留，但应该从后端获取
});

const paginationData = reactive({
  pageNum: 1, //页码
  pageSize: 10, //每页多少条
});

const tableData = reactive({
  list: [],
  total: 0, // 初始化total为0，稍后从后端获取或计算
});

const search = ref("");

//异步
async function fetchUserInfo() {
  try {
    const res = await axios.get("http://localhost:3000/users");

    userInfo.list = res.data /*|| res.data*/; // 假设后端返回的数据中有一个items字段，或者直接是数据数组

    tableData.total = res.data.total || userInfo.list.length; // 从后端获取total，或者如果后端不提供，则使用列表长度（但这通常不是正确的做法，因为列表可能只包含当前页的数据）
    // console.log(userInfo.list);
    updateTableData();
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

const handleSizeChange = (newSize) => {
  paginationData.pageSize = newSize;
  paginationData.pageNum = 1;
  updateTableData();
};

const handleCurrentChange = (newPage) => {
  paginationData.pageNum = newPage;
  updateTableData();
};

const updateTableData = () => {
  const start = (paginationData.pageNum - 1) * paginationData.pageSize;
  const end = start + paginationData.pageSize;

  tableData.list = userInfo.list.slice(start, end);
  
};

const filterTableData = computed(() =>
  tableData.list.filter(
    (data) =>
      !search.value || data.username?.toLowerCase().includes(search.value.toLowerCase())
  )
);
onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="username" label="用户名">
        <template #default="scope">
          <router-link class="route-link" :to="{ path: '/user/' + scope.row.id }">
            {{ scope.row.username }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="主题" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="查找" />
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        v-model:current-page="paginationData.pageNum"
        :page-size="paginationData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-config-provider>
</template>

<style scoped>
.route-link {
  text-decoration: none;
  color: rgb(95, 90, 90);
}
</style>
