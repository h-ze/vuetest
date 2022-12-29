<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-08 19:50:53
 * @FilePath: /vuetest/src/components/post/PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="postStatus">
      
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
              @click="topUpdate"
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

      <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange" @current-change="currenthandleCurrentChange" ref="singleTable">
            <el-table-column type="selection" width="50" align="center" />
      <!-- <el-table :data="tableData" v-loading= "loading" border style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column> -->
          <el-table-column prop="statusId" label="status号" align="center"></el-table-column>
          <el-table-column prop="statusName" label="名称" align="center"></el-table-column>
          <el-table-column prop="statusValue" label="值" align="center"></el-table-column>
          <el-table-column prop="statusType" label="类型" align="center"></el-table-column>

          <el-table-column label="操作" align="center">
              <!-- <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.postId)"></el-button>
              </template> -->
              <template slot-scope="scope" v-if="scope.row.statusId !== 1">
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
  
      

      <el-dialog :title="tagTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">

            <el-form-item label="Status名" :label-width="formStatusWidth">
              <el-input v-model="form.statusName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Status值" :label-width="formStatusWidth">
              <el-input v-model="form.statusValue" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型" :label-width="formStatusWidth">
                <el-input v-model="form.statusType" autocomplete="off"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sumbitForm">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>

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
import { deletePostStatus,updatePostStatus,addPostStatus,getPostOptionsStatus,getPostStatus}  from '@/api/api'
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
          statusMethod:0,
          tagTitle: "",
          form:{
              statusId:'',
              statusName: '',
              statusValue: '',
              statusType: ''
          },
          formStatusWidth: '120px',
          showSearch: true,
          // 非多个禁用
          multiple: true,
          // 日期范围
          dateRange: [],
          // 非单个禁用
          single: true,

          currentData: [],

          ids: []

      }
    },
    created(){
        this.getData({})
    },
    methods:{
        getData(params){
            getPostStatus(params)
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
            this.statusMethod = 1
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const statusId = row.statusId || this.ids.toString();
            this.$modal.confirm('是否确认删除用户编号为"' + statusId + '"的数据项？').then(function() {
                return deletePostStatus({statusId}).then(res =>{
                    console.log("删除tag：",res.data)
                });
            }).then(() => {
                this.getData({});
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.dialogFormVisible = true
            this.tagTitle = "新建Status"
            this.statusMethod = 0
            //   getUser().then(response => {
            //       this.postOptions = response.posts;
            //       this.roleOptions = response.roles;
            //       this.open = true;
            //       this.title = "添加用户";
            //       this.form.password = this.initPassword;
            //   });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            console.log(row)
            this.tagTitle = "修改Status"
            this.statusMethod = 1
            this.form.statusName=row.statusName,
            this.form.statusValue =row.statusValue,
            this.form.statusType =row.statusType
            this.form.statusId = row.statusId
            this.dialogFormVisible = true
        },

        topUpdate(row) {
            console.log(row)
            this.tagTitle = "修改Status"
            this.statusMethod = 1
            const updateItem = this.currentData[0]  
            this.form.statusName=updateItem.statusName,
            this.form.statusValue =updateItem.statusValue,
            this.form.statusType =updateItem.statusType
            this.form.statusId = updateItem.statusId
            this.dialogFormVisible = true
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
            this.form.statusName='',
            this.form.statusValue ='',
            this.form.statusType ='',
            this.form.statusId =''
        },

        sumbitForm(){
            //debugger
            console.log(this.statusMethod)
            if(this.statusMethod == 0){
                addPostStatus(this.form).then(res =>{
                    console.log(res.data)
                    this.dialogFormVisible = false
                    this.reset();
                    this.getData({})
                })
            }else{
                updatePostStatus(this.form).then(res =>{
                    console.log("updateTag:",res.data)
                    this.dialogFormVisible = false
                    this.reset();
                    this.getData({})
                })
            }
        },
    

        // 多选框选中数据
        handleSelectionChange(selection,rows) {
            this.ids = selection.map(item => item.statusId);
            this.currentData = selection.map(item => item);
            this.single = selection.length != 1;
            this.multiple = !selection.length;

            selection.map(item => {
                console.log('item',item.postId)
                //this.$refs.singleTable.setCurrentRow(item);

            })

            if (rows && row.length > 0) {
                rows.forEach(row => {
                console.log('row',item.postId)

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
    }
  }
</script>

<style lang="scss">
.postStatus{
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