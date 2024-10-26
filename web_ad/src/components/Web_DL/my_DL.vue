<template>
    <input type="text" v-model="name" class="user" @focusout="userout($event)" placeholder="邮箱/手机号码/小米ID" @keyup="userup">
    <span class="ts1" v-if="isuser">请输入账号</span>
    <input type="password" v-model="password" class="password" @focusout="passwordout($event)" placeholder="密码"
        @keyup="passwordup">
    <span class="ts2" v-if="ispassword"> 请输入登录密码</span>

    <div class="bottom"> <input type="checkbox" name="" id="" v-model="checkbox">
        <div class="mouse">已阅读并同意小米帐号 <span>用户协议</span>和<span>隐私政策</span></div>
    </div>
    <button class="loginbox" @click="login">登 录</button>
    <div class="service"><span>忘记密码?</span><span>手机号登录</span></div>
    <div style="text-align: center;color: rgb(139, 141, 139); margin-top: 140px;">其他方式登录</div>
    <div class="fourImg">
        <img src="../assets/a2.png" alt="">
        <img src="../assets/a3.png" alt="">
        <img src="../assets/a4.png" alt="">
        <img src="../assets/a5.png" alt="">

    </div>
</template>

<script setup >
import { ref } from "vue";
import axios from "axios"
let checkbox = ref(false)
let name = ref(null)
let password = ref(null)
let isuser = ref(false)
let ispassword = ref(false)
//登录请求
function login() {
    if (checkbox.value == true) axios.get(`/api/login?name=${name.value}&&password=${password.value}`).then(
        response => {
            if (response.data == false) {
                alert("账号或密码错误")
            }
            else {
                let value = "[" + response.data + "]"
                value = JSON.parse(value.replace(/'/g, '"'))
                window.location.href = (`http://localhost:5174/?name=${value[0].name}&&key=${value[0].key}`)
            }

        },
        error => { console.log(error.message) }
    )
    else alert("请阅读并同意小米帐号 用户协议和隐私政策")

}
function userout(e) {
    if (e.target.value == "")
        isuser.value = true

}
function passwordout(e) {
    if (e.target.value == "")
        ispassword.value = true
}
function passwordup(e) {
    if (e.target.value != "") ispassword.value = false
    else ispassword.value = true
}
function userup(e) {
    if (e.target.value != "") isuser.value = false
    else isuser.value = true
}
</script>

<style lang="scss">
.user {
    transform: translateY(45px);
    width: 355px;
    height: 65px;
    margin-left: 50px;
    outline-color: rgb(255, 136, 0);
}

.password {
    transform: translateY(65px);
    margin-left: 20px;
    width: 355px;
    height: 65px;
    margin-left: 50px;
    outline-color: orange;
}

.ts1,
.ts2 {
    display: block;
    color: rgb(240, 70, 69);
    transform: translatex(50px) translateY(50px);
}

.ts2 {
    transform: translatex(50px) translateY(70px);
}

.bottom {
    margin-top: 80px;
    margin-left: 40px;

    input {
        width: 20px;
        height: 20px;
    }

    input:hover {
        cursor: pointer;
    }

    div {
        display: inline-block;
        font-size: 14px;
        color: rgb(164, 163, 163);

        span {
            padding: 0 6px;
            color: #333;
        }
    }

}

.loginbox {
    height: 60px;
    width: 370px;
    position: absolute;
    left: 50%;
    margin-top: 20px;
    transform: translateX(-50%);
    background-color: rgb(255, 190, 153);
    border: none;
}

.service {
    background-color: #333;
    position: relative;
    top: 90px;
    width: 370px;
    margin: 0 auto;

}

.service span:nth-child(1) {
    position: absolute;
    left: 0;
    color: orange;
}

.service span:hover:nth-child(1) {
    cursor: pointer;
}

.service span:hover:nth-child(2) {
    cursor: pointer;
}

.service span:nth-child(2) {
    position: absolute;
    right: 0;
    color: orange;
}

.fourImg {
    text-align: center;
    margin-top: 20px;
    height: 110px;

    img {
        width: 55px;
        margin: 0 10px;
    }
}
</style>