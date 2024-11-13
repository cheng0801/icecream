import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2000
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