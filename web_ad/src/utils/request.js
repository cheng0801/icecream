import axios from 'axios'


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2000
})

//请求拦截
instance.interceptors.request.use(config => {
    //头部携带token
    return config;
})

//相应拦截
instance.interceptors.response.use(res => {
    return res;
}, err => {
    return Promise.reject(err)

})

export function get(url, params) {
    return instance.get(url, {
        params
    });
}

export function post(url, data) {
    return instance.post(url, data);
}

export function del(url,) {
    return instance.delete(url);
}

export function put(url, data) {
    return instance.put(url, data);
}

export function patch(url, data) {
    return instance.patch(url, data);
}




export default instance