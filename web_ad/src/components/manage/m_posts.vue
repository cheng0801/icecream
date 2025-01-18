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
import { fetchUserData, fetchUserData11 } from "@/api";
import TableCustom from "@/components/manage/m_t_custom.vue";
import TableDetail from "@/components/manage/m_t_detail.vue";
import TableSearch from "@/components/manage/m_search.vue";
import TableEdit from "@/components/manage/m_edit.vue";

import { FormOption, FormOptionList } from "@/types/form-option";
import { User } from "@/types/user"
import { getToken } from "@/utils/auth";
const user_token=getToken()

// 查询相关
const query = reactive({
  username: ""
});

const layout = ref("total,sizes, prev, pager, next,jumper")
// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { type: "a",prop: "title", label: "主题", width: 300 },
  { prop: "username", label: "作者" },
  { prop: "browse", label: "查看" },
  { prop: "update_time", label: "更新时间", width: 100 },
  { prop: "create_time", label: "创建时间", width: 100 },
  {type:"swich", prop: "top", label: "置顶" },
  { prop: "operator", label: "操作", width: 250 },

]);
const tableData = ref<User[]>([]);
const filterData = ref([])

//分页计算
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

const mygetData = async () => {
  // const res = await fetchUserData();
  const res = await getData(/*"api/user/detail/4"*/"api/theme/list/1");
  const { status, msg, num, data_theme } = res.data
  console.log(status, msg, num, data_theme);
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  // console.log(res);

  //首次刷新
  if (!filterData) {
    filterData.value = data_theme

  } else {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    tableData.value = data_theme.slice(start, end)

    filterData.value = data_theme
  }


  total.value = res.data.num;



  if (!filterData.value || !Array.isArray(filterData.value)) {
    console.error('filterData 未被正确定义或初始化');
    return;
  }
  filterData.value = filterData.value.map(item => ({
    ...item,
    update_time: formatTime(item.update_time) // 调用格式化函数

  })

  );
  if (data_theme && Array.isArray(data_theme)) {
    tableData.value = data_theme.slice(start, end).map(item => ({
      ...item,
      update_time: formatTime(item.update_time), // 调用格式化函数
      create_time: formatTime(item.create_time),
      title: truncatedTitle(item.title)
    }));
  }
  console.log(filterData.value)
};
getData()
//内容缩略
const truncatedTitle = (title, maxLength = 20) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};
// 方法，用于格式化时间差异
function formatTime(update_time) {
  // 计算属性，用于过滤和格式化表格数据

  // 假设这是从服务器或其他来源获取的 update_time 字符串
  const updateTimeStr = update_time;

  // 使用 Date 对象解析这个时间字符串
  const updateTime = new Date(updateTimeStr);

  // 获取当前时间
  const now = new Date();

  // 计算时间差（毫秒）
  const timeDifference = now - updateTime;

  // 将时间差转换为更易读的格式
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  let timeDifferenceString;

  if (timeDifference >= secondsInDay * 1000) {
    // 注意：这里需要将秒转换为毫秒进行比较
    const days = Math.floor(timeDifference / (secondsInDay * 1000));
    timeDifferenceString = `${days}天前`;
  } else if (timeDifference >= secondsInHour * 1000) {
    const hours = Math.floor(timeDifference / (secondsInHour * 1000));
    timeDifferenceString = `${hours}小时前`;
  } else if (timeDifference >= secondsInMinute * 1000) {
    const minutes = Math.floor(timeDifference / (secondsInMinute * 1000));
    timeDifferenceString = `${minutes}分钟前`;
  } else {
    // 由于时间差可能小于一分钟，并且我们可能有毫秒级的精度，
    // 所以这里可以简单地返回“刚刚”或者更精确地显示秒数或毫秒数。
    // 为了简单起见，这里使用“刚刚”。
    timeDifferenceString = `刚刚`;
    // 如果需要更精确，可以使用以下代码：
    // const seconds = Math.floor(timeDifference / 1000);
    // timeDifferenceString = `${seconds}秒前`;
    // 或者，如果需要显示毫秒：
    // const milliseconds = timeDifference;
    // timeDifferenceString = `${milliseconds}毫秒前`;
  }
  return timeDifferenceString;
}

const searchOpt = ref<FormOptionList[]>([
  { type: "input", label: "用户名：", prop: "username" },
]);

// 过滤和分页的函数
const filterAndPaginateData = (data, queryName, currentPage, pageSize) => {
  console.log("调用filterAndPaginateData");
  // 先过滤数据
  const filteredData = data.filter(
    (dataItem) => !queryName || dataItem.username?.toLowerCase().includes(queryName.toLowerCase())
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
  const a = filterAndPaginateData(filterData.value, query.username, currentPage.value, pageSize.value);
  tableData.value = a.filterTableData

  total.value = a.filterTableDataLength
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 12,
  list: [
    { type: "input", label: "用户名", prop: "username", required: true },
    { type: "input", label: "手机号", prop: "phone", required: true },
    { type: "input", label: "密码", prop: "password", required: true },
    { type: "input", label: "邮箱", prop: "email", required: true },
    { type: "input", label: "角色", prop: "role", required: true },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({
  list: [
    { type: "input", label: "用户名", prop: "username", required: true },
    { type: "input", label: "手机号", prop: "phone", required: true },
    { type: "input", label: "密码", prop: "password", required: true },
    { type: "input", label: "邮箱", prop: "email", required: true },
    { type: "input", label: "角色", prop: "role", required: true },
  ],
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
    {
      prop: "id",
      label: "用户ID",
    },
    {
      prop: "username",
      label: "用户名",
    },
    {
      prop: "password",
      label: "密码",
    },
    {
      prop: "email",
      label: "邮箱",
    },
    {
      prop: "phone",
      label: "电话",
    },
    {
      prop: "role",
      label: "角色",
    },
    {
      prop: "update_time",
      label: "注册日期",
    },
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
  const res = await delData("user/" + url);
  console.log(res);
  updateData();
  ElMessage.success("删除成功");
};

//编辑相关
const handleEdit = (row) => {

  rowData.value = { ...row };

  console.log(rowData.value.id, '行数据详情');
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

// 生成随机角色

// function generateUserData(count) {
//   const roles = ["管理员", "普通用户"];
//   // const date = "2024-01-01";
//   // const password = "123"; // 在实际应用中，密码应该是随机生成的

//   function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

//   function getRandomString(length) {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 0; i < length; i++) {
//       result += chars.charAt(getRandomInt(chars.length));
//     }
//     return result;
//   }

//   for (let i = 0; i < count; i++) {
//     tableData.value.push({
//       id: `${i + 1}`, // 使用模板字符串来确保ID被双引号包围，并递增
//       username: getRandomString(7), // 生成一个随机的两个字符的姓名后缀，并加上“某”字作为名字
//       password: getRandomString(7),
//       email: getRandomString(5) + "@qq.com", // 生成一个随机的邮箱前缀
//       phone: "1" + getRandomInt(9999999999).toString().padStart(10, "0"), // 生成一个随机的11位手机号
//       update_time: Date.now(),
//       role: roles[getRandomInt(roles.length)], // 随机分配一个角色
//     });
//     post("user", tableData.value[i]);
//   }

//   return tableData.value;
// }

// 使用函数生成5个用户数据
// generateUserData(666);

// const updateTableData = () => {
//   getData();
//   handleSearch();  

// };

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
