<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns" :tableData="tableData" :total="total" :viewFunc="handleView"
        :delFunc="handleDelete" :editFunc="editUpdata" :refresh="refresh" @handleSizeChange="handleSizeChange"
        :layout="layout" @handleCurrentChange="handleCurrentChange">
        <template #toolbarBtn>
          <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
        </template>
      </TableCustom>
    </div>
    <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
      :close-on-click-modal="false" @close="closeDialog">
      <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="handleEdit" />
    </el-dialog>
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData"></TableDetail>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { fetchUserData, fetchUserData11, fetchUserDataImg } from "@/api";
import TableCustom from "@/components/manage/m_t_custom.vue";
import TableDetail from "@/components/manage/m_t_detail.vue";
import TableSearch from "@/components/manage/m_search.vue";
import TableEdit from "../m_edit.vue";

import { FormOption, FormOptionList } from "@/types/form-option";
import { User } from "@/types/user"
import { moren } from "@/assets/img/web_ad";

// 查询相关
const query = reactive({
  id: ""
});

const layout = ref("total,sizes, prev, pager, next,jumper")
// 表格相关
let columns = ref([
  { prop: "id", label: "图片位置", width: 55, align: "center" },
  {type:"image", prop: "imgUrl", label: "图片" },
  { prop: "url", label: "地址" },
 
  { prop: "operator", label: "操作", width: 250 },
]);
const tableData = ref<User[]>([]);
const filterData = ref([])

//分页计算
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

const mygetData = async () => {
  const res = await fetchUserDataImg();
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  console.log(res.data[0].status);
  //首次刷新
  if(res.data[0].status===200){
    if (!filterData) {
    filterData.value = res.data

  } else  {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    tableData.value = res.data.slice(start, end)

    filterData.value = res.data
  }
  total.value = res.data.length;     
  } else {
    res.data=moren
    console.log(moren,'默认图片');
    if (!filterData) {
    filterData.value = res.data

  } else  {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    tableData.value = res.data.slice(start, end)

    filterData.value = res.data
  }
  total.value = res.data.length;  
  }
  
};
getData()


const searchOpt = ref<FormOptionList[]>([
  { type: "input", label: "用户名：", prop: "id" },
]);

// 过滤和分页的函数
const filterAndPaginateData = (data, queryName, currentPage, pageSize) => {
  console.log("调用filterAndPaginateData");
  // 先过滤数据
  const filteredData = data.filter(
    (dataItem) => !queryName || dataItem.id?.toLowerCase().includes(queryName.toLowerCase())
  );

  // 再分页
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const filterTableData = filteredData.slice(start, end)
  const filterTableDataLength = filteredData.length
  return { filterTableData, filterTableDataLength }

};




const handleSearch = () => {

  console.log("调用handlesearch");
  // 直接调用过滤和分页函数，并更新 tableData 和 total
  const a = filterAndPaginateData(filterData.value, query.id, currentPage.value, pageSize.value);
  tableData.value = a.filterTableData

  total.value = a.filterTableDataLength
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 12,
  list: [
    { type: "select", prop: "id", label: "图片位置", align: "center",opts:[
    {label:"左下",opt:"左下"},{label:"左上",opt:"左上"},{label:"右下",opt:"右下"},{label:"右上",opt:"右上"},
    ] },
    { type: "upload", prop: "imgUrl", label: "图片" },
    { type: "input", prop: "url", label: "地址" },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({
  labelWidth: "100px",
  list: [

    { type: "upload", label: "角色", prop: "role", required: true },
],
id:null
});
//控制编辑框
const editUpdata = (row) => {
  rowData.value = { ...row };
  isEdit.value = true;
  visible.value = true;
};



const closeDialog = () => {
  visible.value = false;
  isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
});
const handleView = (row: User) => {
  viewData.value.row = { ...row };
  viewData.value.list = [
  { type: "input", prop: "id", label: "图片位置", align: "center"  },
    { type: "upload", prop: "imgUrl", label: "图片" },
    { type: "input", prop: "url", label: "地址" },
    // {
    //   prop: "id",
    //   label: "用户ID",
    // },
    // {
    //   prop: "username",
    //   label: "用户名",
    // },
    // {
    //   prop: "password",
    //   label: "密码",
    // },
    // {
    //   prop: "email",
    //   label: "邮箱",
    // },
    // {
    //   prop: "phone",
    //   label: "电话",
    // },
    // {
    //   prop: "role",
    //   label: "角色",
    // },
    // {
    //   prop: "update_time",
    //   label: "注册日期",
    // },
  ];
  visible1.value = true;
};

//分页相关
const handleSizeChange = (ref) => {
  console.log(ref, "父组调用Size方法");
  pageSize.value = ref;
  updateTableData();
};
const handleCurrentChange = (ref) => {
  console.log(ref, "父组件调用Current方法");
  currentPage.value = ref;
  updateTableData();
};

// 删除相关
import { delData, getData, put, mypostData } from "@/utils/request";


const handleDelete = async (row: User) => {
  const url = row.id;
  const res = await delData("images/" + url);
  console.log(res);
  updateData();
  ElMessage.success("删除成功");
};

//编辑相关
const handleEdit = (row: User) => {

  rowData.value = { ...row };
  console.log(rowData.value.id, row);
  const id = rowData.value.id;
  //上传修改
  if (rowData.value.id) {
    // console.log(11111111111)
    put("user/" + id, rowData.value);
  } else {
    console.log(22222)
    mypostData("user/", rowData.value);
  }
  updateData();
  visible.value = false;
};

const updateTableData = () => {
  console.log("调用updateTableData");
  mygetData();
  handleSearch();
}

const updateData = () => {
  console.log("调用updateData");
  closeDialog();
  updateTableData();
};
//刷新
const refresh = () => {
  updateData();
  ElMessage.success("刷新成功");
};


onMounted(() => {

  updateData();

});



</script>

<style scoped></style>