<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getUserId } from '@/utils/auth';
import { put, getData } from '@/utils/request';
const userID=getUserId()
// 定义响应式数据
// const form = ref({
//     nickname: "",
//     age: null,
//     email: "",
//     mobilePhoneNumber: "",
//     sex: null,
//     id: null,
//     account: "",
//     area: "",
//     hobby: "",
//     work: "",
//     design: "",
// });
let formData = ref({
    id: 0,
    username: "",
    password: "",
    salt: "",
    email: "",
    title: 0,
    score: 0,
    old: 0,
    level: 0,
    update_time: "",
    create_time: ""
});


const rules = reactive({
    nickname: [
        { required: true, message: "昵称不能为空", trigger: "blur" },
    ],
    mobilePhoneNumber: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        {
            pattern: /^[1][0-9_]{11}$/,
            message: "手机号由11位数字组成",
            trigger: "blur",
        },
    ],
});


// 加载用户信息
// const load = async () => {
//     try {
//         // const res = await getData("api/theme/detail_1");
//         const res = await getData("user/123456");
//         // console.log("--------------------------------------------------------");
//         // console.log(typeof(res), res, 666666666666);
//         // console.log(typeof(res.data), res.data, 77777777777);
//         // console.log(typeof(JSON.stringify(res.data)), JSON.stringify(res.data), 8888888888);
//         // let testdata = res.data;
//         // testdt = res.data;
//         // console.log(testdata, 999999999999);
//         // console.log(testdt, 2222222222);
//         // 它的作用是将 res.data 对象中的所有可枚举属性复制到 form 对象中。如果 res.data 和 form 有相同的属性
//         // 那么 form 对象中对应属性的值将被 res.data 中对应属性的值覆盖。
//         // Object.assign(form, res.data);
//         formData.value = res.data;
//         console.log(formData.value,111111111);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const load = async () => {
//     try {
//         // const res = await getData("api/theme/detail_1");
//         const res = await getData("user/147258");
//         // 它的作用是将 res.data 对象中的所有可枚举属性复制到 form 对象中。如果 res.data 和 form 有相同的属性
//         // 那么 form 对象中对应属性的值将被 res.data 中对应属性的值覆盖。
//         // Object.assign(form, res.data);
//         console.log(res.data,'.........');
//         const{status,user_info}=res.data
//         console.log(status,user_info);
//         formData.value = user_info;
//         console.log(formData.value,111111111);
//     } catch (err) {
//         console.log(err);
//     }
// };

const load = async () => {
    try {
        // const res = await getData("api/theme/detail_"+userID);
        const res = await getData("api/theme/detail_1"/*+userID*/);
        // const res = await getData("user/1");
        const { status, user_info } = res.data;
        if (status === 200) {
            // 假设 user_info 包含 update_time 和 create_time 字段
            let formattedUserInfo = { ...user_info };
            // 格式化时间
            formattedUserInfo.formattedUpdateTime = formatTime(user_info.update_time);
            formattedUserInfo.formattedCreateTime = formatTime(user_info.create_time);
            // 更新 formData
            formData.value = JSON.parse(JSON.stringify(formattedUserInfo))
            // console.log(formData.value, 111111111);
        }
        // 假设 user_info 包含 update_time 和 create_time 字段
        // let formattedUserInfo = { ...user_info };
        // // 格式化时间
        // formattedUserInfo.formattedUpdateTime = formatTime(user_info.update_time);
        // formattedUserInfo.formattedCreateTime = formatTime(user_info.create_time);
        // // 更新 formData
        // formData.value = JSON.parse(JSON.stringify(formattedUserInfo))
        // // console.log(formData.value, 111111111);
    } catch (err) {
        console.log(err);
    }
};

// 时间格式化函数
function formatTime(isoString) {
    const date = new Date(isoString.replace('T', ' ').replace('.+', ''));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日${hours}时${minutes}分`;
}
// 提交表单
function consoleaaaa() {
    // console.log(testdt, 5555555555);

}
const submit = async () => {
    try {
        console.log(JSON.stringify(formData.value),"用户信息修改响应");
        const res = await put("api/theme/detail_1", JSON.stringify(formData.value));
        console.log(res.data,JSON.stringify(formData.value),"用户信息修改响应");
    } catch (err) {
        console.log(err);
    }
};

function ssss(ms) {
    setTimeout(() => {
        console.log("sleep .....");
        console.log(testdt, 444444444444);
        console.log(formData, "aaaaaaaaaaaaaaa");
    }, ms);
};

// ssss(20000);

// console.log(testdt, 5555555555);

// 生命周期钩子
onMounted(() => {
    load();
    // console.log(formData,".................");
    // ssss(20000);
    // consoleaaaa();
});
</script>

<template>
    <div>
        <!-- <el-form :model="form" :rules="rules" ref="form" label-width="150px"> -->
        <el-form style="max-width: 600px" v-model="form" status-icon :rules="rules" label-width="auto" size="saml">
            <div class="updateinfo">
                <!-- <div class="left">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="form.age"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-switch v-model="form.sex" active-color="#13ce66" inactive-color="#ff4949" active-text="男"
                            inactive-text="女" :active-value="1" :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobilePhoneNumber">
                        <el-input v-model="form.mobilePhoneNumber"></el-input>
                    </el-form-item>
                </div>
                <div class="right">
                    <el-form-item label="用户编号" prop="id">
                        <el-input v-model="form.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="form.account" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地区" prop="area">
                        <el-input v-model="form.area"></el-input>
                    </el-form-item>
                    <el-form-item label="兴趣爱好" prop="hobby">
                        <el-input v-model="form.hobby"></el-input>
                    </el-form-item>
                    <el-form-item label="职业" prop="work">
                        <el-input v-model="form.work"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="design">
                        <el-input v-model="form.design"></el-input>
                    </el-form-item>
                </div> -->
                <div class="left">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formData.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" prop="gold" >
                        <el-input v-model="formData.gold" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="等级" prop="level">
                        <el-input v-model="formData.level" disabled></el-input>
                    </el-form-item>
                </div>
                <div class="right">
                    <!-- <el-form-item label="用户编号" prop="id">
                        <el-input v-model="formData.id" disabled></el-input>
                    </el-form-item> -->
                    <el-form-item label="修改时间">
                        <el-input v-model="formData.formattedUpdateTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="formData.formattedCreateTime" disabled></el-input>
                    </el-form-item>

                </div>
            </div>
        </el-form>
        <span class="dialog-footer">
            <el-button @click="consoleaaaa">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
        </span>

    </div>
</template>
<style scoped>
.updateinfo {
    height: 350px;
    overflow: auto;
}

.left {
    /* width: 330px; */
    float: left;
    margin-right: 10px;
}

.right {
    overflow: hidden;
}
</style>
