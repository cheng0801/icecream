<script setup>
import { reactive, onMounted, ref, computed, watch } from "vue";
import ElPagination from "@/components/Pagination/my_Pagination.vue";
import { put, getData } from '@/utils/request';
import { getToken } from "@/utils/auth";
const token = getToken()
const userInfo = reactive({
  list: [],
  // 假设后端会返回total字段来表示总记录数
  // total: 0, // 这行暂时保留，但应该从后端获取
});

const paginationData = reactive({
  pageNum: 1, //页码
  pageSize: 40, //每页多少条
});

const tableData = reactive({
  list: [],
  total: 0, // 初始化total为0，稍后从后端获取或计算
});

const search = ref("");

//异步
// async function fetchUserInfo() {
//   try {
//     // const res = await getData("api/theme/detail_1");
//     const res = await getData("post");
//     console.log(res.data,"响应列表数据");
//     // const { status, user_info,data_theme } = res.data;
//     const { status, user_info,data_theme } = res.data[0];
//     console.log(status, user_info,data_theme.browse,"解构数据");
//     userInfo.list.push(data_theme) /*|| res.data*/; // 假设后端返回的数据中有一个items字段，或者直接是数据数组

//     tableData.total = res.data.total || userInfo.list.length; // 从后端获取total，或者如果后端不提供，则使用列表长度（但这通常不是正确的做法，因为列表可能只包含当前页的数据）

//     updateTableData();
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     throw error;
//   }
// }

async function fetchUserInfo() {
  try {
    const res = await getData("api/theme/list/1");
    // const res = await getData("post");
    console.log(res.data,"响应列表数据");
    const { status, user_info,data_theme } = res.data;
    // const { status, user_info,data_theme } = res.data[0];
    console.log(status, user_info,data_theme,"解构数据");
    userInfo.list=data_theme /*|| res.data*/; // 假设后端返回的数据中有一个items字段，或者直接是数据数组

    tableData.total = res.data.total || userInfo.list.length; // 从后端获取total，或者如果后端不提供，则使用列表长度（但这通常不是正确的做法，因为列表可能只包含当前页的数据）

    updateTableData();
  } catch (error) {
    console.error("首页列表加载失败:", error);
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

  tableData.list = filteredAndFormattedTableData.value.slice(start, end);
  tableData.total = filteredAndFormattedTableData.value.length
  console.log(tableData.list, filteredAndFormattedTableData.value, filteredAndFormattedTableData.value.length);
};

const filterTableData = computed(() =>
  userInfo.list.filter(
    (data) =>
      !search.value || data.username?.toLowerCase().includes(search.value.toLowerCase())
  )

);

// 计算属性，用于过滤和格式化表格数据
const filteredAndFormattedTableData = computed(() => {
  return filterTableData.value.map((row) => ({
    ...row,
    formattedUpdateTime: formatTimeDifference(row.update_time),
  }));
});

// 方法，用于格式化时间差异
function formatTimeDifference(update_time) {
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
//对类容进行缩略
const truncatedTitle = (title, maxLength = 30) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

watch(search, updateTableData)

onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <el-table :data="tableData.list" style="width: 100%">
    <!-- <el-table-column prop="id" label="ID" /> -->
      
    <el-table-column prop="title" label="主题" width="500px">
      <template #default="scope">
        <router-link class="route-link" :to="{ path: '/user/' + scope.row.id }">
          {{ truncatedTitle(scope.row.title) }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="作者" />
    <el-table-column prop="browse" label="查看" />
    <el-table-column label="更新时间">
      <template #default="scope">
        {{ formatTimeDifference(scope.row.update_time) }}
      </template>
    </el-table-column>
    <el-table-column align="right">
      <!-- <template #header>
        <el-input v-model="search" size="small" placeholder="查找" />
      </template> -->
    </el-table-column>
  </el-table>
  <div>
    <ElPagination v-model:current-page="paginationData.pageNum" :page-size="paginationData.pageSize"
      :page-sizes="[160, 120, 80, 40]" layout="total,sizes, prev, pager, next, jumper" :total="tableData.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  </div>

</template>

<style scoped>
.route-link {
  text-decoration: none;
  color: rgb(95, 90, 90);
}
</style>
