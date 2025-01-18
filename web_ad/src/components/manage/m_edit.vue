<template>
  <!-- 使用Element Plus的el-form组件，绑定表单数据、验证规则和标签宽度 -->
  <el-form ref="formRef" :model="form" :rules="rules" :label-width="options.labelWidth">
    <el-row>
      <!-- 循环遍历options.list，为每个表单项创建一个el-col和el-form-item -->
      <el-col :span="options.span" v-for="item in options.list">
        <el-form-item :label="item.label" :prop="item.prop">
          <!-- 根据item.type决定显示哪种表单控件，这里只处理了input类型 -->
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]" :disabled="item.disabled"
            :placeholder="item.placeholder" clearable></el-input>
          <el-upload v-else-if="item.type === 'upload'" class="avatar-uploader" action="#" :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form[item.prop]" :src="form[item.prop]" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <el-switch v-else-if="item.type === 'switch'" v-model="form[item.prop]"
						:active-value="item.activeValue" :inactive-value="item.inactiveValue"
						:active-text="item.activeText" :inactive-text="item.inactiveText">
          </el-switch>
          <el-select v-else-if="item.type === 'select'" v-model="form[item.prop]" :disabled="item.disabled"
						:placeholder="item.placeholder" clearable>
						<el-option v-for="opt in item.opts" :label="opt.label" :value="opt.opt"></el-option>
					</el-select>
          <!-- 注意：这里可以扩展以支持更多类型的表单控件，如select, checkbox等 -->
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 提交按钮，点击时调用saveEdit方法 -->
    <el-form-item>
      <el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { FormOption } from "@/types/form-option"; // 引入FormOption类型定义
import { FormInstance, FormRules, UploadProps } from "element-plus"; // 引入Element Plus相关类型
import { PropType, ref } from "vue"; // 引入Vue的ref和PropType
import { delData, getData, put, mypostData } from "@/utils/request";
// 使用defineProps定义组件接收的props
const { options, formData, edit, update } = defineProps({
  options: {
    type: Object as PropType<FormOption>, // 表单配置，包括布局、验证规则等
    required: true,
  },
  formData: {
    type: Object, // 表单初始数据
    required: true,
  },
  edit: {
    type: Boolean, // 是否为编辑模式
    required: false,
  },
  update: {
    type: Function, // 更新表单数据的回调函数
    required: true,
  },
});

// 根据edit模式初始化表单数据
const form = ref({ ...(edit ? formData : {}) });

// 根据options.list生成表单验证规则
const rules: FormRules = options.list
  .map((item) => {
    if (item.required) {
      return {
        [item.prop]: [
          { required: true, message: `${item.label}不能为空`, trigger: "blur" },
        ],
      };
    }
    return {};
  })
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

// 获取el-form的引用，用于表单验证
const formRef = ref<FormInstance>();
const emits = defineEmits(["xiugaiData"]);
// 保存或更新表单数据的方法
const saveEdit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return false; // 如果验证不通过，则不提交
    console.log(form)

    update(form.value); // 验证通过后，调用update回调更新数据
    ElMessage.success("修改成功");
  });
};

// 处理文件上传成功的回调（虽然此代码段中未直接使用，但提供了处理上传成功的示例）
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  form.value.thumb = URL.createObjectURL(uploadFile.raw!); // 将上传的文件设置为表单数据的一部分
};
</script>

<style scoped>
/* 样式部分，定义了上传控件的样式 */
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  width: 100px;
  height: 100px;
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
  width: 200px;
  height: 200px;
}
</style>
