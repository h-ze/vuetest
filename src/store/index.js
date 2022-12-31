/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-28 19:47:28
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-31 12:44:15
 * @FilePath: /vuetest/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
import user from './modules/user'
// import tagsView from './modules/tagsView'
// import permission from './modules/permission'
// import settings from './modules/settings'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  // modules: {
  //   app,
  //   user,
  //   tagsView,
  //   permission,
  //   settings
  // },
  getters,
  state:{
    webSocketMsg:''
  },
  mutations:{
      SET_WS_MSG: (state, msg) =>{
          state.webSocketMsg = msg
      }
  }

})

export default store
