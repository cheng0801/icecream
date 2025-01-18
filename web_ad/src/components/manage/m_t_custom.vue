<template>
  <div class="custom-container">
    <div class="table-toolbar" v-if="hasToolbar">
      <div class="table-toolbar-left">
        <slot name="toolbarBtn"></slot>
      </div>
      <div class="table-toolbar-right">
        <el-tooltip effect="dark" content="刷新" placement="top">
          <el-icon class="columns-setting-icon" @click="refresh">
            <Refresh />
          </el-icon>
        </el-tooltip>
        <el-divider direction="vertical" />
        <el-tooltip effect="dark" content="列设置" placement="top">
          <el-dropdown :hide-on-click="false" size="small" trigger="click">
            <el-icon class="columns-setting-icon">
              <Setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="c in columns">
                  <el-checkbox v-model="c.visible" :label="c.label" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>
    <el-table class="mgb20" :style="{ width: '100%' }" border :data="tableData" :row-key="rowKey"
      @selection-change="handleSelectionChange" table-layout="auto">
      <template v-for="item in columns" :key="item.prop">
        <el-table-column v-if="item.visible" :prop="item.prop" :label="item.label" :width="item.width" :type="item.type"
          :align="item.align || 'center'">
          <template #default="{ row, column, $index }" v-if="item.type === 'index'">
            {{ getIndex($index) }}
          </template>
          <!-- <template #default="{ row, column, $index }" v-if="item.prop === 'imgUrl'">
             这里是显示图片的列 
            <img :src="row[item.prop]" alt="Row Image" style="width: 50px; height: 50px;">
          </template> -->
          <template #default="{ row, column, $index }" v-if="item.prop === 'title'">
            <router-link :to="{ path: '/user/' + row.id }" class="RouterLink"> <!-- 使用 router-link 进行路由跳转 -->
              {{ row.title }}
            </router-link>
          </template>

          <template #default="{ row, column, $index }" v-if="item.prop === 'top'">
            <el-switch  v-model="row[item.prop]"
						:active-value="item.activeValue" :inactive-value="item.inactiveValue"
						:active-text="item.activeText" :inactive-text="item.inactiveText">
          </el-switch>
          </template>

          <template #default="{ row, column, $index }" v-if="item.prop === 'imgUrl'">
            <img :src="row[item.prop]" alt="Row Image" style="width: 50px; height: 50px;">
          </template>
        

          <template #default="{ row, column, $index }" v-if="!item.type">
            <slot :name="item.prop" :rows="row" :index="$index">
              <template v-if="item.prop == 'operator'">
                <el-button type="warning" size="small" :icon="View" @click="viewFunc(row)">
                  查看
                </el-button>
                <el-button type="primary" size="small" :icon="Edit" @click="editFunc(row)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">
                  删除
                </el-button>
              </template>
              <span v-else-if="item.formatter">
                {{ item.formatter(row[item.prop]) }}
              </span>
              <span v-else>
                {{ row[item.prop] }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination class="custom_page" v-if="hasPagination" :currentPage="currentPage" :page-size="pageSize"
      :page-sizes="pageSizes" :background="background" :total="total" :layout="layout" :pager-count="pagerCount"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from "vue";
import { Delete, Edit, View, Refresh } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
// import my_Pagination from "../Pagination/my_Pagination.vue";
//双向绑定
const currentPage = defineModel("currentPage", { type: Number, default: 1 });
const pageSize = defineModel("pageSize", { type: Number, default: 10 });


const emits = defineEmits(["handleSizeChange", "handleCurrentChange", "updateTableData"]);


function handleSizeChange(val) {

  console.log(`${val} items per page`);
  pageSize.value = val;
  emits("handleSizeChange", val);
}
function handleCurrentChange(val) {
  currentPage.value = val;
  console.log(`current page: ${val}`);
  emits("handleCurrentChange", val);
}

const props = defineProps({
  //   表格相关
  tableData: {
    type: Array,
    default: [],
  },

  columns: {
    type: Array as PropType<any[]>,
    default: [

    ],

  },
  rowKey: {
    type: String,
    default: "id",
  },
  hasToolbar: {
    type: Boolean,
    default: true,
  },
  //  分页相关
  hasPagination: {
    type: Boolean,
    default: true,
  },
  //总条目数
  total: {
    type: Number,
    default: 0,
  },
  //是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: true,
  },
  //每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: [10, 20, 30, 40, 100],
  },
  //总页数
  pagerCount: {
    type: Number,
    default: 5,
  },
  layout: {
    type: String,
    default: "total,sizes, prev, pager, next,jumper",
  },
  delFunc: {
    type: Function,
    default: (row) => { console.log(row, '行数据详情'); },
  },
  viewFunc: {
    type: Function,
    default: () => { },
  },
  editFunc: {
    type: Function,
    default: () => { },
  },
  delSelection: {
    type: Function,
    default: () => { },
  },
  refresh: {
    type: Function,
    default: () => { },
  },
});

let {
  tableData,
  columns,
  rowKey,
  hasToolbar,
  hasPagination,
  total,
  layout,
} = toRefs(props);

columns.value.forEach((item) => {
  if (item.visible === undefined) {
    item.visible = true;
  }
});

// 当选择项发生变化时会触发该事件
const multipleSelection = ref([]);
const handleSelectionChange = (selection: any[]) => {
  multipleSelection.value = selection;
};



const handleDelete = (row) => {
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(async () => {
      props.delFunc(row);
    })
    .catch((err) => {
      console.error;
    });
};

const getIndex = (index: number) => {
  return index + 1 + (currentPage.value - 1) * pageSize.value;
};
getIndex(2);

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
    timeDifferenceString = `刚刚`;

  }
  return timeDifferenceString;
}

</script>

<style scoped>
.custom-container {
  padding: 20px 30px 0;
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.RouterLink {
  text-decoration: none;
  color: #020f1b;
  font-weight: bold;
}
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}

.table-toolbar-right {
  display: flex;
  align-items: center;
  /* 垂直居中 */
}

.columns-setting-icon {
  display: block;
  font-size: 18px;
  cursor: pointer;
  color: #676767;
}
</style>
<style>
.table-header .cell {
  color: #333;
}
</style>
