import request from '@/utils/request' 



// export const login=((data)=>{
//     return request.post('users',{
//     data
//     });
//     });


    //test
    export const login=((data)=>{
        return request.get('users/123',{
        data
        });
        });


// request.interceptors.request.use(onFulifiled:(config) => {
// config.headers['token'] = 'xxx'
//     return config
// })

// request.interceptors.response.use((response)=>{
    
// })