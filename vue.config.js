/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-01 11:47:58
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-31 19:41:22
 * @FilePath: /vuetest/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    open:true,
    host: 'localhost',
    proxy:{
      '/api':{
        
        // target目标:真实的接口服务器地址
        target: 'http://localhost:6001/',
        changeOrigin : true,
        //将原路径中的/api切除掉
        pathRewrite:{
          '^/api' : ''
        },
      },
      // '/websocket':{
      //   target: 'ws://localhost:6001/',
      //   changeOrigin : true,
        
      //   ws: true,
      //   secure:false,
      // }

    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: "expanded" }
      }
    }
  },
  chainWebpack(config) {

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }

})
