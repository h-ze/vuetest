<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-07 21:18:04
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-07 21:18:14
 * @FilePath: /vuetest/src/components/setting/Setting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    设置

    <el-descriptions class="margin-top" title="垂直无边框列表" :column="4" direction="vertical">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>