import request from '@/utils/request' 



// export const login=((data)=>{
//     return request.post('users',{
//     data
//     });
//     });


    //test
    export const login=((data)=>{
        return request.get('user/0801',{
        data
        });
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
                    export const fetchUserData11 = ((data) => {
                        return request.get('user/2',{
                            data
                            });
                            });

            export const getPosts = ((data) => {
                return request.get('posts/12191',{
                    data
                    });
                    });

                    export const delPosts = (() => {
                        return request.del('user/2',{
                            
                            });
                            });


// request.interceptors.request.use(onFulifiled:(config) => {
// config.headers['token'] = 'xxx'
//     return config
// })

// request.interceptors.response.use((response)=>{
    
// })