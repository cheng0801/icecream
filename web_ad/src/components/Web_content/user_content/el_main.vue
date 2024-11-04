<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    // 分页相关方法
    handleSizeChange(val) {
    this.pageSize = val;
      this.fetchData();
      console.log(this);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
      console.log(this);
    },
    // 数据请求方法
    fetchData() {
      // 这里模拟请求数据，实际中应该使用API请求
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.tableData = []; // 清空数据
      this.total = 1000; // 假设总数据量为100
      for (let i = start; i < end; i++) {
        this.tableData.push({
          date: "2016-05-02",
          name: "王小虎",
          address: `上海市普陀区金沙江路${i}号`,
        });
      }
    },
    // 添加、编辑、删除方法
    handleAdd() {
      // 添加逻辑console.log(this);
    },
    handleEdit(index, row) {
      // 编辑逻辑
    },
    handleDelete(index, row) {
      // 删除逻辑
      this.tableData.splice(index, 1);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<template>
  <el-main>
    <div>
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination></div
  ></el-main>
</template>

<style scoped></style>
