/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-01 11:47:58
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-02 20:02:49
 * @FilePath: /vuetest/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    open:true,
    host: 'localhost',
    proxy:{
      '/api':{
        target: 'http://localhost:6001',
        changeOrigin : true,
        pathRewrite:{
          '^/api' : ''
        }
      }
    }
  }

})
