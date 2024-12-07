import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useInfoStore = defineStore('userInfo', () => {
    const userInfo = reactive({
        username: "",
        passwoad: ""
    })
    function saveInfo(data) {
        userInfo.value = data
    }
    return {userInfo,saveInfo}
})


export const useTokenStore = defineStore('token', () => {
    // 使用 ref 直接管理令牌数据，初始化为空对象
    const tokenData = ref({});

    // 计算属性，返回安全的令牌对象
    const token = computed(() => {
        try {
            // 尝试解析 tokenData.value 为 JSON 对象
            return typeof tokenData.value === 'string' ? JSON.parse(tokenData.value) : tokenData.value || {};
        } catch (err) {
            console.error("JSON 字符串格式不对，转化失败");
            // 返回空对象作为默认值
            return {};
        }
    });

    // 动作，接受一个 JSON 字符串或对象，并安全地保存它
    function saveToken(data) {
        try {
            // 如果传入的是字符串，则尝试解析它；否则，直接使用它
            tokenData.value = typeof data === 'string' ? JSON.parse(data) : data;
        } catch (err) {
            console.error("在保存令牌时发生错误:", err);
            // 可以选择回退到默认的空对象或其他逻辑
            // tokenData.value = {}; // 如果需要的话，可以取消注释这行
        }
    }

    return { token, saveToken };
});