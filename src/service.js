/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 13:19:28
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:37:21
 * @FilePath: /vuetest/src/service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import store from '@/store'

import { getCookie } from '@/utils/cookie.js'
import { Notification, MessageBox, Message, Loading } from 'element-ui'
const service = axios.create({
    baseURL: '/api',
    timeout:3000
})

// 是否显示重新登录
export let isRelogin = { show: false };

//添加请求拦截器

service.interceptors.request.use((config) => {
    //在请求之前做些什么（获取并设置token）
    console.log('request',config)
    config.headers['token'] = getCookie('token')
    return config
},(error) => {
    return Promise.reject(error)
})
//添加响应拦截器
service.interceptors.response.use((res) => {
    //对响应数据做些什么
    console.log('response',res)
    if(res.status !== 200){
        Message({message: message || 'error',type: 'warning'})
        return Promise.reject(error)
    }

    // 未设置状态码则默认成功状态
    const code = res.data.code ;
    //const code = 999999 ;
    
    console.log('code',code)
    
    // 获取错误信息
    //const msg = errorCode[code] || res.data.msg || errorCode['default']
    const msg = 'response error'
    // 二进制数据则直接返回
    if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer'){
        return res.data
    }
    console.log('length',store.getters.roles.length)
    console.log('token',!localStorage.getItem('token'))
    if (code === 999999) {
        console.log('log',isRelogin.show)
        if (!isRelogin.show) {
            isRelogin.show = true;
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
            }
        ).then(() => {
            isRelogin.show = false;
            console.log('relogin')
            //location.reload() // 为了重新实例化vue-router对象 避免bug
            //location.href ='/login'
            //this.$router.push('login')
            store.dispatch('LogOut').then(() => {
                console.log('length1',store.getters.roles.length)
                location.href = '/login';
            })
        }).catch(() => {
            isRelogin.show = false;
        });
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        Message({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(msg))
    } 
    // else if (code !== 200) {
    //     Notification.error({
    //         title: msg
    //     })
    //     return Promise.reject('error')
    // } 
    else {
        return res.data
    }

    // let {status ,message} =response.data
    // if(response.status !== 200){
    //     Message({message: message || 'error',type: 'warning'})
    //     return Promise.reject(error)
    // }else{
    //     return response.data

    // }
},(error) => {

    console.log('responseError',error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service