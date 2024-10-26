<script>

export default {
  data() {
    return {
      searchContent: '',
      currentPage: 1,
      pageSize: 10,
      total: 111, // 总条目数，需要从后端获取或手动设置
      pvData: [/* 初始化数据 */], // 假设这是从后端获取的数据数组
    };
  },
  computed: {
    filteredData() {
      return this.pvData.filter(item => item.name.includes(this.searchContent))
    }
  },
  methods: {
    handleFilter() {
      this.currentPage = 1; // 重置到第一页
    },
    handleCreate() {
      // 新增用户的逻辑，这里可以调用后端API或直接在pvData中添加新项
    },
    handleSizeChange(val) {
      this.pageSize = val; // 分页大小改变时的处理逻辑，可以调用后端API获取数据或重新计算pvData的slice范围
    },
    handleCurrentChange(val) {
      this.currentPage = val; // 当前页改变时的处理逻辑，可以调用后端API获取数据或重新计算pvData的slice范围
    }
  }
};
</script>



<template>

  <div class="tab-container">
    <div class="filter-container" style="margin-bottom: 20px">
      <el-input maxlength="40" placeholder="用户名" style="width: 200px" v-model="searchContent"
        @keyup.enter="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchContList">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-edit"
        @click="handleCreate">新增用户</el-button>
    </div>
    <el-table :data="filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border fit
      highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-pagination @size-change="handleSizeChange" :current-page="currentPage" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-table>
  </div>
</template>



<style scoped></style>
