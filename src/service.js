/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 13:19:28
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-04 14:40:53
 * @FilePath: /vuetest/src/service.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

import { getToken } from '@/utils/setToken.js'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: '/api',
    timeout:3000
})

//添加请求拦截器

service.interceptors.request.use((config) => {
    //在请求之前做些什么（获取并设置token）
    config.headers['token'] = getToken('token')
    return config
},(error) => {
    return Promise.reject(error)
})
//添加响应拦截器
service.interceptors.response.use((response) => {
    //对响应数据做些什么
    let {status ,message} =response.data
    if(response.status !== 200){
        Message({message: message || 'error',type: 'warning'})
        return Promise.reject(error)
    }else{
        return response.data

    }
},(error) => {
    return Promise.reject(error)
})

export default service