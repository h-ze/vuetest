/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-01 11:47:58
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:26:31
 * @FilePath: /vuetest/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
//全局引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'
import router from './router'
import service from './service'
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
import Editor from "@/components/Editor"

Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)


Vue.prototype.axios = axios
Vue.prototype.service = service

router.beforeEach((to,from,next) =>{
  if(!localStorage.getItem('token')){
    if(to.path !== '/login'){
      next('/login')
    }else next()
  }
  next()
})

//import '../plugins/element.js'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')