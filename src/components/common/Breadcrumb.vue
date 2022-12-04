<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 16:12:01
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-03 16:17:33
 * @FilePath: /vuetest/src/components/common/Breadcrumb.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.matched " :key="index">
        {{item.name}}
        </el-breadcrumb-item>
        
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>