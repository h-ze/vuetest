<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 14:42:05
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-03 16:06:58
 * @FilePath: /vuetest/src/components/common/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="menu">
        <el-aside width="200px">
        <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            >
            <template v-for="(item,index) in menus" >
                <el-submenu :index ="index +  ''" :key="index" v-if="!item.hidden">
                <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{item.name}}</span>
                </template>
                <el-menu-item-group v-for="(children,index) in item.children" :key="index">
                <el-menu-item :index="children.path">
                    <i :class="children.iconClass"></i>
                    
                    {{children.name}}
                </el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </template>
            
            
        </el-menu>
    </el-aside>
    </div>
  </template>
  
  <script>
  export default {
      data(){
          return {
            menus: []
          }
      },
      created(){
        console.log(this.$router.options.routes)
        this.menus = this.$router.options.routes
      }
  }
  </script>
  
  <style lang="scss" scoped>
  .menu{
    .el-aside {
        height: 100%;
        .el-menu {
            height: 100%;
        }
        .el-submenu .el-menu-item {
            min-width: 0;
        }
    }
  }
  </style>