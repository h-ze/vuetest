<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 14:42:05
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:43:06
 * @FilePath: /vuetest/src/components/common/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="header">
    <el-header>

        <div class="title">
            Header
        </div>
        <div>{{name}}</div>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>
import {getToken} from '@/utils/setToken'
export default {
    data(){
        return {
            name:''
        }
    },
    created(){
        this.name =getToken('username')
    }
}
</script>

<style lang="scss" scoped>
.header{
    .el-header{
        //background-color: aqua;
        //color: #fff;
        color:gray;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .title{
            width:200px;
            font-size: 24px;
        }
    }
}
</style>