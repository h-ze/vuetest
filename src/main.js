/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-01 11:47:58
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-28 20:14:03
 * @FilePath: /vuetest/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
//全局引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/blog.scss' // 自定义 css
Vue.use(ElementUI)

import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'
import router from './router'
import service from './service'
import store from './store'
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
import Editor from "@/components/Editor"
import modal from "@/plugins/modal"

// 字典标签组件
//import DictTag from '@/components/DictTag'
// 字典数据组件
//import DictData from '@/components/DictData'

Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)

import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

//Vue.component('DictTag', DictTag)
//DictData.install()

Vue.prototype.axios = axios
Vue.prototype.service = service
// 模态框对象
Vue.prototype.$modal = modal

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
  store,
  render: h => h(App),
}).$mount('#app')