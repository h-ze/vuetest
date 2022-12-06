<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-04 16:44:03
 * @FilePath: /vuetest/src/components/post/PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="postList">
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
    <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onReset">重置</el-button>
    </el-form-item>
    </el-form> -->






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
    <!-- <el-table :data="tableData" v-loading= "loading" border style="width: 100%"> -->
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="postId" label="文档Id" align="center"></el-table-column>
        <el-table-column prop="authorId" label="作者Id" align="center"></el-table-column>
        <el-table-column prop="channelId" label="地址" align="center"></el-table-column>
        <el-table-column prop="comments" label="内容" align="center"></el-table-column>
        <el-table-column prop="created" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="favors" label="喜爱" align="center"></el-table-column>
        <el-table-column prop="featured" label="特色" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column prop="summary" label="概要" align="center"></el-table-column>
        <el-table-column prop="tags" label="标签" align="center"></el-table-column>
        <!-- <el-table-column prop="thumbnail" label="略图" align="center"></el-table-column> -->
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="views" label="查看数" align="center"></el-table-column>
        <el-table-column prop="weight" label="比重" align="center"></el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
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
              <!-- <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" >
                <span class="el-dropdown-link">
                  <i class="el-icon-d-arrow-right el-icon--right"></i>更多
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="handleResetPwd" icon="el-icon-key"
                    v-hasPermi="['system:user:resetPwd']">重置密码</el-dropdown-item>
                  <el-dropdown-item command="handleAuthRole" icon="el-icon-circle-check"
                    v-hasPermi="['system:user:edit']">分配角色</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </template>
          </el-table-column>
    </el-table>

    <el-dialog title="修改博客信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>

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
import { postList,getPostListByOther }  from '@/api/api'
import { del } from 'vue'
import { Alert } from 'element-ui'
export default {
    data() {
      return {
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }]
        tableData: [],
        page:1,
        per_page:10,
        total:0,
        loading:false,
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
        this.getData({page: this.page,per_page:this.per_page})
    },
    methods:{
        getData(params){
            postList(params)
            .then(res =>{
                if(res.code === 100000){
                    this.total = res.data.totalSize
                    this.tableData =res.data.data
                    //loading = false
                }
            })
        },
        getDataByOther(){
            getPostListByOther({page: this.page,per_page:this.per_page,title:this.formInline.name})
            .then(res =>{
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
        // 多选框选中数据
        handleSelectionChange(selection) {
          this.single = selection.length != 1;
          this.multiple = !selection.length;
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
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
            },
        }
  }
</script>

<style lang="scss">
.postList{
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
}
</style>