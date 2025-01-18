import request from '@/utils/request' 
import axios from 'axios';
import { getToken } from '@/utils/auth';

// export const login=((data)=>{
//     return request.post('users',{
//     data
//     });
//     });


    //test
    export const login=((data)=>{
        return request.post('api/login',data);
    });

    export const login1=(()=>{
        return request.get('api/user/detail/2',getToken());
    });
    

    export const posts=((id,content)=>{
        return request.patch('posts/'+id,{
      content
        });
        });

        export const uploadFile=((data)=>{
            return request.put('posts/1219',{
            data
            });
            });


    export const fetchRoleData = ((data) => {
        return request.get('list',{
            data
            });
            });
            
            export const fetchUserData = ((data) => {
                return request.get('user',{
                    data
                    });
                    });
                    export const fetchUserDataImg = ((data) => {
                        return request.get('images',{
                            data
                            });
                            });

            export const getPosts = (() => {
                return request.get('posts');
                    });

                    // export const delPosts = (() => {
                    //     return request.del('user/2',{
                            
                    //         });
                    //         });


// request.interceptors.request.use(onFulifiled:(config) => {
// config.headers['token'] = 'xxx'
//     return config
// })

// request.interceptors.response.use((response)=>{
    
// })