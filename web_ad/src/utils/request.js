import  axios  from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000/users",
    timeout:2000
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
    return instance.put(url,data);
}

export function patch(url, data) {
    return instance.patch(url,data);
}