<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-07 20:37:24
 * @FilePath: /vuetest/src/components/post/PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="PostLog">
      
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
          <!-- <el-col :span="1.5">
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
          </el-col> -->
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
          <el-col :span="1.5">
              <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              >导入</el-button>
          </el-col>
          <el-col :span="1.5">
              <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              >导出</el-button>
          </el-col>
          <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns" class="righttoolbar"></right-toolbar>     -->
      </el-row>

      <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange" @current-change="currenthandleCurrentChange" ref="singleTable">
            <el-table-column type="selection" width="50" align="center" />
      <!-- <el-table :data="tableData" v-loading= "loading" border style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column> -->
          <el-table-column prop="logId" label="日志Id" align="center"></el-table-column>
          <el-table-column prop="userId" label="作者Id" align="center"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="ip" label="ip地址" align="center"></el-table-column>
          <el-table-column prop="operatorDate" label="操作时间" align="center"></el-table-column>
          <el-table-column prop="operator" label="操作" align="center"></el-table-column>
          <el-table-column prop="code" label="状态码" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.postId)"></el-button>
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

      <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <treeselect v-model="form.deptId" :options="deptOptions" :show-count="true" placeholder="请选择归属部门" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option
                  v-for="dict in dict.type.sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位">
              <el-select v-model="form.postIds" multiple placeholder="请选择岗位">
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPostLogs,postList,getPostListByOther }  from '@/api/api'
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
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 表单校验
            rules: {
                userName: [
                { required: true, message: "用户名称不能为空", trigger: "blur" },
                { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
                ],
                nickName: [
                { required: true, message: "用户昵称不能为空", trigger: "blur" }
                ],
                password: [
                { required: true, message: "用户密码不能为空", trigger: "blur" },
                { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
                ],
                email: [
                {
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur", "change"]
                }
                ],
                phonenumber: [
                {
                    pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                    message: "请输入正确的手机号码",
                    trigger: "blur"
                }
                ]
            },
            // 部门树选项
            deptOptions: undefined,
            // 岗位选项
            postOptions: [],
            roleOptions: [],
        }
        },
        created(){
            this.getData({page: this.page,per_page:this.per_page})
        },
        methods:{
            getData(params){
                getPostLogs(params)
                .then(res =>{
                    this.loading = false
                    if(res.code === 100000){
                        this.total = res.data.totalSize
                        this.tableData =res.data.data
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
                    this.getData({page: this.page,per_page:this.per_page})
                }
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page =val
    
                if(this.formInline.name !==''){
                    this.getDataByOther()
                }else{
                this.getData({page: this.page,per_page:this.per_page})
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
                this.open = true;
                // this.getTreeselect();
                // getUser().then(response => {
                //     this.postOptions = response.posts;
                //     this.roleOptions = response.roles;
                //     this.open = true;
                //     this.title = "添加用户";
                //     this.form.password = this.initPassword;
                // });
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
           handleSelectionChange(selection,rows) {
                this.ids = selection.map(item => item.logId);
                this.currentData = selection.map(item => item);
                this.single = selection.length != 1;
                this.multiple = !selection.length;

                if (rows && row.length > 0) {
                    rows.forEach(row => {

                    this.$refs.singleTable.toggleRowSelection(row);
                    });
                }
            },
            currenthandleCurrentChange(row){

                if (row) {
                    this.$refs.singleTable.clearSelection();
                    this.$refs.singleTable.toggleRowSelection(row);
                }
            },
            /** 查询部门下拉树结构 */
            getTreeselect() {
                // treeselect().then(response => {
                //     this.deptOptions = response.data;
                // });
            },
            cancel(){
                this.open = false;
            },
            submitForm(){
              
            }
    }
  }
</script>

<style lang="scss">
.PostLog{
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