<script setup>
import { ref, reactive, onMounted, computed } from "vue";

import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

onMounted(() => {
  tableData.list = mockData.list;
  tableData.total = mockData.total;
});

// 模拟数据
const mockData = reactive({
  list: [
    { id: 1, name: "商品A", price: 100, stock: 50 },
    { id: 2, name: "商品B", price: 200, stock: 30 },
    { id: 3, name: "商品C", price: 150, stock: 40 },
    // ....更多假数据
  ],
  total: 3,
});

// 参数一：当前页数
// 参数二：每页数据条数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 1,
});

// 数据源
const tableData = reactive({
  list: [],
  total: 0,
});

// 处理分页大小变化
const handleSizeChange = (newSize) => {
  paginationData.pageSize = newSize;
  paginationData.pageNum = 1; // 重置为第一页
  updateTableData();
  // console.log(updateTableData());
  // console.log((paginationData.pageSize = newSize));
};

// 处理当前页变化
const handleCurrentChange = (newPage) => {
  paginationData.pageNum = newPage;
  updateTableData();
  // console.log(paginationData.pageNum);
};

// 更新表格数据
const updateTableData = () => {
  const start = (paginationData.pageNum - 1) * paginationData.pageSize;
  const end = start + paginationData.pageSize;
  tableData.list = mockData.list.slice(start, end);
  tableData.total = mockData.total;
  // console.log("\\\\");
  // console.log(start);
  // console.log(end);
  // console.log(tableData.list);
};
const search = ref("");
const filterTableData = computed(() =>
  tableData.list.filter(
    (data) =>
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <!-- 此处是table表单域，如果有不懂的可以看我的补充文档，在最底下 -->
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="stock" label="库存" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
    </el-table-column>
  </el-table>

  <el-config-provider :locale="zhCn">
    <!-- 此处就是展示分页的核心逻辑了 -->
    <div >
      <el-pagination
        v-model:current-page="paginationData.pageNum"
        :page-size="paginationData.pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-config-provider>
</template>

<style  scoped>

</style>
