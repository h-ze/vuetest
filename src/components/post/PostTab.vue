<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-08 19:50:53
 * @FilePath: /vuetest/src/components/post/PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="postTab">
      
      <el-form :model="formInline" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" class="demo-form-inline">
          <el-form-item label="用户名称" prop="title">
          <el-input
              v-model="formInline.name"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="onSubmit"
          />
          </el-form-item>
          <el-form-item label="手机号码" prop="title">
          <el-input
              v-model="formInline.title"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter.native="onSubmit"
          />
          </el-form-item>
          <el-form-item label="状态" prop="title">
          <el-select
              v-model="formInline.title"
              placeholder="用户状态"
              clearable
              style="width: 240px"
          >
              <!-- <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
              /> -->
          </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
          <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="onReset">重置</el-button>
          </el-form-item>
      </el-form>
      
      <el-row :gutter="10" class="mb8" style="">
          <el-col :span="1.5">
              <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              >新增</el-button>
          </el-col>
          <el-col :span="1.5">
              <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              >修改</el-button>
          </el-col>
          <el-col :span="1.5">
              <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              >删除</el-button>
          </el-col>
          
          <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns" class="righttoolbar"></right-toolbar>     -->
      </el-row>

      <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
      <!-- <el-table :data="tableData" v-loading= "loading" border style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column> -->
          <el-table-column prop="tagId" label="Tag号" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="introduction" label="介绍" align="center"></el-table-column>
          <el-table-column prop="image" label="图片" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
              <!-- <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.postId)"></el-button>
              </template> -->
              <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
      </el-table>
  
      
  
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10,20,30,50,100]"
          :page-size="per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
  </div>
</template>

<script>
import { getTags}  from '@/api/api'
import { del } from 'vue'
import { Alert } from 'element-ui'
export default {
      data() {
          return {
          tableData: [],
          page:1,
          per_page:10,
          total:0,
          loading:true,
          formInline:{
              name:''
          },
          dialogFormVisible:false,
          form:{
              name: ''
          },
          formLabelWidth: '120px',
          showSearch: true,
          // 非多个禁用
          multiple: true,
          // 日期范围
          dateRange: [],
          // 非单个禁用
          single: true,
      }
    },
    created(){
        this.getData({})
    },
    methods:{
          getData(params){
              getTags(params)
              .then(res =>{
                  this.loading = false
                  if(res.code === 100000){
                      this.total = 10
                      this.tableData =res.data
                  }
              })
          },
          getDataByOther(){
              getPostListByOther({page: this.page,per_page:this.per_page,title:this.formInline.name})
              .then(res =>{
                  this.loading = false
                  if(res.code === 100000){
                      this.total = res.data.totalSize
                      this.tableData =res.data.data
                      //loading = false
                  }
              })
          },
          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
              this.per_page =val;
              this.page =1
              if(this.formInline.name !==''){
                  this.getDataByOther()
              }else{
                  this.getData()
              }
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.page =val
  
              if(this.formInline.name !==''){
                  this.getDataByOther()
              }else{
              this.getData()
              }
          },
          del(){
              
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
              }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });          
              });


          },
          onSubmit(){
              this.getDataByOther()
          },
          onReset(){
              this.getData({page: this.page,per_page:this.per_page})
          },
          updatePostMessage(){
              this.dialogFormVisible =true
          },
          /** 删除按钮操作 */
          handleDelete(row) {
              const userIds = row.userId || this.ids;
              this.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function() {
                  return delUser(userIds);
              }).then(() => {
                  this.getList();
                  this.$modal.msgSuccess("删除成功");
              }).catch(() => {});
          },
          /** 新增按钮操作 */
          handleAdd() {
              this.reset();
              this.getTreeselect();
              getUser().then(response => {
                  this.postOptions = response.posts;
                  this.roleOptions = response.roles;
                  this.open = true;
                  this.title = "添加用户";
                  this.form.password = this.initPassword;
              });
          },
          /** 修改按钮操作 */
          handleUpdate(row) {
              this.reset();
              this.getTreeselect();
              const userId = row.userId || this.ids;
              getUser(userId).then(response => {
                  this.form = response.data;
                  this.postOptions = response.posts;
                  this.roleOptions = response.roles;
                  this.form.postIds = response.postIds;
                  this.form.roleIds = response.roleIds;
                  this.open = true;
                  this.title = "修改用户";
                  this.form.password = "";
              });
          },
          /** 导出按钮操作 */
          handleExport() {
              this.download('system/user/export', {
                  ...this.queryParams
              }, `user_${new Date().getTime()}.xlsx`)
          },
          /** 导入按钮操作 */
          handleImport() {
              this.upload.title = "用户导入";
              this.upload.open = true;
          },
          // 表单重置
          reset() {
          
          },
          // 多选框选中数据
          handleSelectionChange(selection) {
            this.single = selection.length != 1;
            this.multiple = !selection.length;
          },
    }
  }
</script>

<style lang="scss">
.postTab{
    .el-pagination{
        text-align: left;
        margin-top: 20px;
    }
    .demo-form-inline,.el-form-item{
        text-align: left;
    }
    .el-dialog{
        width: 500px;
        text-align: left;
    }
    .righttoolbar,el-row{
      background-color: balck;
    }
}
</style>