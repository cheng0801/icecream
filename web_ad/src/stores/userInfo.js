import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useInfoStore = defineStore('userInfo', () => {
    const userInfo = reactive({
        "id": "",
        "username": "",
        "password": "",
        "ischeked": Boolean,
        "msg": "",
        "status": 1,
        "email": "",
        "phone": "",
        "update_time": "",
        "token": {},
        "role": "",
        "avatar": ""

    })
    function saveInfo(data) {

        userInfo.id = data.id
        userInfo.username = data.username
        userInfo.token = data.token
        userInfo.password = data.password
        userInfo.msg = data.msg
        userInfo.status = data.status
        userInfo.email = data.email
        userInfo.phone = data.phone
        userInfo.update_time = data.update_time
        userInfo.role = data.role
        userInfo.avatar = data.avatar
    }




    function remove() {
        localStorage.removeItem("userInfo")
    }


    return { userInfo, saveInfo, remove, }
},

    {
        persist: true, //开启持久化存储
    }

)


export const useTokenStore = defineStore('token', () => {
    // 使用 ref 直接管理令牌数据，初始化为空对象
    const tokenData = ref({});

    // 计算属性，返回安全的令牌对象
    const token = computed(() => {
        try {
            // 尝试解析 tokenData.value 为 JSON 对象
            return typeof tokenData.value === 'string' ? JSON.parse(tokenData.value) : tokenData.value || {};
        } catch (error) {
            console.error("JSON 字符串格式不对，转化失败" + error);
            // 返回空对象作为默认值
            return {};
        }
    });

    // 接受一个 JSON 字符串或对象，并安全地保存它
    function saveToken(data) {
        try {
            // 如果传入的是字符串，则尝试解析它；否则，直接使用它
            tokenData.value = typeof data === 'string' ? JSON.parse(data) : data;

        } catch (err) {
            console.error("在保存令牌时发生错误:", err);
            // 可以选择回退到默认的空对象或其他逻辑
            
        }
    }

    return { token, saveToken };
});