import request from '../utils/request'

//用户请求登录
export const login = async (loginInfo) => {
const {username, password} = loginInfo;
const url = 'user';

    try {
        const respones = await request.post(url, {
            username,
            password
        });
        if (respones.data && respones.data.token) {
            localStorage.setItem('authToken', respones.data.token);
        }
    } catch (err) {
        console.err('登陆失败', err);
        throw err;
    }

}