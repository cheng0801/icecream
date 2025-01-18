//存
// localStorage 是一种持久化存储，用于在用户的浏览器中保存数据，除非用户主动删除数据，否则数据将一直存在。
//  sessionStorage 是一种会话存储，用于在当前浏览器会话中保存数据。当浏览器窗口或标签页关闭时，数据会被销毁
export function setToken(token) {
    return sessionStorage.setItem('token', token);
};
//取
export function getToken() {
    return sessionStorage.getItem('token');
};
//删
export function removeToken(token) {
    return sessionStorage.removeItem('token');
};



export function setUserId(userId) {
    return localStorage.setItem('userId', userId);
};
//取
export function getUserId() {
    return localStorage.getItem('userId');
};
//删
export function removeUserId(userId) {
    return localStorage.removeItem('userId');
};


