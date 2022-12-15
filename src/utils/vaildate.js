/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 13:03:54
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-04 17:02:46
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

export function titleRule(rule,value,callback){
    if(value === ''){
        callback(new Error('请输入标题'))
    } else{
        callback()
    }
}

export function summaryRule(rule,value,callback){
  if(value === ''){
      callback(new Error('请输入摘要'))
  } else{
      callback()
  }
}

export function contentRule(rule,value,callback){
  if(value === ''){
      callback(new Error('请输入内容'))
  } else{
      callback()
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
  }
  
  /**
   * @param {string} url
   * @returns {Boolean}
   */
  export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }
  
  /**
   * @param {string} email
   * @returns {Boolean}
   */
  export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
  
  /**
   * @param {string} str
   * @returns {Boolean}
   */
  export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
      return true
    }
    return false
  }
  
  /**
   * @param {Array} arg
   * @returns {Boolean}
   */
  export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }