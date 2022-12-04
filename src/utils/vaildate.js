/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 13:03:54
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-04 14:11:12
 * @FilePath: /vuetest/src/utils/vaildate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//用户名匹配

export function nameRule(rule,value,callback) {
    callback()
    // let reg = /(^[a-zA-Z0-9]{4,10}$)/;
    // if(value === ''){
    //     callback(new Error('请输入用户名'))
    // } else if (!reg.test(value)){
    //     callback(new Error('请输入4-10位用户名'))
    // } else{
    //     callback()
    // }
}

export function passRule(rule,value,callback) {
    callback()
    // let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    // if(value === ''){
    //     callback(new Error('请输入密码'))
    // } else if (!reg.test(value)){
    //     callback(new Error('请输入6-12位密码,密码需要包括大小写字母和数字及特殊符号'))
    // } else{
    //     callback()
    // }
}