
import axios from 'axios'
//import store from '@/store'

// 项目环境(dev、sit、uat等)


//因此如果需要兼容低版本浏览器(caniuse)，需要引入polyfill。
//Polyfill 项目使用的是 es6-promise
//import promise from 'es6-promise'
//promise.polyfill();

// console.log(ENV);
/* 创建一个新的 AXIOS 对象，确保原有的对象不变 */
var ajax = axios.create({
    baseURL: ENV.baseURL/* 服务器的根路径 */,
    headers: {
        /* 一些公用的 header */
       // 'token': appInfo.token
      'Content-Type': 'application/json;charset=utf-8;'
      //'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest:[function (data, header){
        /* 自定义请求参数解析方式（如果必要的话） */
        return JSON.stringify(data);
    }]
    // paramsSerializer:function(params){
    //     /* 自定义链接参数解析方式（如果必要的话） */
    // }
});

/* 过滤请求 */
ajax.interceptors.request.use((config) => {
    //store.commit('UPDATE_LOADING_STATUS', {isLoading: true});
    return config;
});

/* 过滤响应 */
ajax.interceptors.response.use((result) => {
  //  store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
    return result.data;
}, result => {
  //  store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
    return Promise.reject(result);
});


export default ajax;
