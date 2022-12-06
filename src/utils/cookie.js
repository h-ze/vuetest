/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 13:13:44
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-03 14:22:14
 * @FilePath: /vuetest/src/utils/cookieUtil.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function setCookie(tokenKey,token){
    return localStorage.setItem(tokenKey,token)
}

export function getCookie(tokenKey){
    return localStorage.getItem(tokenKey)
}

export function removeCookie(tokenKey){
    return localStorage.removeItem(tokenKey)
}