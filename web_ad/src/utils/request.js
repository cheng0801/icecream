import axios from 'axios';
// import { getToken } from './auth'
import { useTokenStore } from '@/stores/userInfo'
import { useRoute } from 'vue-router'
import { getToken } from "@/utils/auth";
const user_token=getToken()
const myroute = useRoute()
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

// 请求拦截
instance.interceptors.request.use(config => {
    //头部携带token
    const token = getToken()
    if (token) {
        console.log( '111', token);
        config.headers['Authorization'] = `${token}`;
        // config.headers['token'] = token;
    }
    return config;
},
    err => {
        return Promise.reject(err);
    }
)


const openTokenRefresh = true; // 是否开启token刷新,如果开启，就设置为true就好
const pendingRequests = []; // 保存所有请求的回调，用于刷新token后重新请求
const onTokenRefreshed = (token) => {
  // 刷新token后，重新请求,
  pendingRequests.forEach((callback) => {
    callback(token);
  });
  pendingRequests.length = 0;
};
const addPendingRequest = (callback) => {
  pendingRequests.push(callback);
};
//是否正在刷新token
let isRefreshing = false;

instance.interceptors.response.use((response) => response, async (error) => {
  if (error.response && error.response.status === 401 && openTokenRefresh) {
  	//获取refreshToken 
 	const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        //没有refreshToken，跳转登录页面
      window.location.href('/login')
      return Promise.reject('登录失效，请重新登录');
    }
    if (!isRefreshing) {
      try{
         isRefreshing = true;
         //请求更新token
      	 const data= await getData("api/user/refreshToken?token="+user_token);
       	 localStorage.setItem('token', data.token);
       	 localStorage.setItem('refreshToken', data.refreshToken);
       	 onTokenRefreshed(data.token);
       }catch(err){
       	  window.location.href('/login')
       	  return Promise.reject(err)
       }
       finally{
      	  isRefreshing = false
       }
    }
	      //存储当前请求
      return new Promise((resolve) => {
        addPendingRequest((newToken) => {
          response.config.headers['Authorization'] ='Bearer'+ newToken;
          resolve(instance(response.config));
        });
      });
  }

  return Promise.reject(error);
});


//响应拦截
// instance.interceptors.response.use(res => {
//     if (res.data.errno !== 999) {

//         const postId = myroute.params.id
//         console.log(postId);
//         console.log("111111111111111111");
//         console.log(myroute);
//         myroute.push('/');
//         console.log(myroute);
//         // router.replace("/", "")

//         console.log("token过期");
//     }
//     return res;


// }, err => {
//     return Promise.reject(err)

// })

// export function getData(url, params) {
//     return instance.get(url, {
//         params
//     });
// }

export function getData(url) {
    return instance.get(url);
}

export function mypostData(url, data) {
    return instance.post(url, data);
}

export function delData(url) {
    return instance.delete(url);
}

export function put(url, data) {
    return instance.put(url, data);
}

export function patchData(url, data) {
    return instance.patch(url, data);
}




export default instance