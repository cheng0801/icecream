x
<script lang="ts" setup>


import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'



const ruleFormRef = ref<FormInstance>()




const validateId = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        if (ruleForm.id !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('id')
        }
        callback()
    }
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次密码不一致"))
    } else {
        callback()
    }
}


// computed(() => {
//         const regex = /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/;
//         return regex.test(ruleForm.value);
//     })
const ruleForm = reactive({
    id: '',
    pass: '',
    checkPass: '',
    tele: '',
})






const rules = reactive<FormRules<typeof ruleForm>>({
    id: [
        { validator: validatePass, trigger: 'blur' },
        { required: true, message: "请输入账号", trigger: 'blur' },
        { min: 6, max: 30, message: "账号需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' },
        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/, message: "账号需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' }
    ],
    pass: [
        { validator: validatePass, trigger: 'blur' },

        { required: true, message: "请输入密码", trigger: 'blur' },
        { min: 6, max: 30, message: "密码需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' },
        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/, message: "密码需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' }
    ],
    checkPass: [
        { validator: validatePass2, trigger: 'blur' },
        { min: 6, max: 30, message: "密码需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' },
        { pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/, message: "账号需为字母开头,且由6到30位字母或数字或下划线组成", trigger: 'blur' }
    ],
    tele: [

        { required: true, message: "请输入电话号码", trigger: 'blur' },
        { pattern: /^1\d{10}$/, message: "电话号码需为1开头的11位数字", trigger: 'blur' }
    ],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>





<template>
    <div class="home">

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
            label-width="auto" class="demo-ruleForm">

            <el-form-item label="账号" prop="id">
                <el-input v-model="ruleForm.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="on" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话" prop="tele">
                <el-input v-model.number="ruleForm.tele" />
            </el-form-item>
            <el-form-item>
                <el-button @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重填</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.demo-ruleForm {
    margin: 10% auto;
}


.el-button {
    margin: 0 auto;
}
</style>
