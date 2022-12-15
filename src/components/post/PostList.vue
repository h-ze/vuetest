<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-10 16:07:19
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
        <!-- <el-form-item label="用户名称" prop="authorName">
          <el-input
            v-model="formInline.authorName"
            placeholder="请输入用户名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item> -->

        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="formInline.title"
            placeholder="请输入文章标题"
            clearable
            style="width: 240px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="文章状态" prop="status">
          <el-select
            v-model="formInline.status"
            placeholder="请选择文章状态"
            clearable
            style="width: 240px"
          >
          <el-option
              v-for="dict in dicts"
              :key="dict.labelName"
              :label="dict.labelValue"
              :value="dict.labelName"
            ></el-option>
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
            @click="toShowContent"
            >查看内容</el-button>
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

    <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange"  @current-change="currenthandleCurrentChange" ref="singleTable">
    <!-- <el-table :data="tableData" v-loading= "loading" border style="width: 100%"> -->
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="postId" label="文档Id" align="center"></el-table-column>
        <!-- <el-table-column prop="authorId" label="作者Id" align="center"></el-table-column> -->
        <el-table-column prop="authorName" label="作者名" align="center"></el-table-column>
        
        <el-table-column prop="channelId" label="地址" align="center"></el-table-column>

        <!-- <el-table-column prop="content" label="内容" align="center"></el-table-column> -->
        
        <el-table-column prop="comments" label="评论数" align="center"></el-table-column>
        <el-table-column prop="created" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="favors" label="喜爱" align="center"></el-table-column>
        <el-table-column prop="featured" label="特色" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" :formatter="getStatus">
          <!-- <template slot-scope="scope">
           {{getStatus(scope.row.status)}}
          </template> -->
        </el-table-column>
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
                @click="handContent(scope.row)"
              >查看内容</el-button>

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

            <el-form-item label="文章标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="文章标签" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.tags" autocomplete="off"></el-input> -->
              <el-select v-model="form.tags" placeholder="请选择文章对外发布的标签">
                <el-option
                  v-for="tag in tags"
                  :key="tag.name"
                  :label="tag.name"
                  :value="tag.name"
              ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文章概要" :label-width="formLabelWidth">
              <el-input v-model="form.summary" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="文章状态" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择文章对外发布的状态">
                <el-option
                  v-for="dict in dicts"
                  :key="dict.labelName"
                  :label="dict.labelValue"
                  :value="dict.labelName"
                ></el-option>
              </el-select>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sumbitForm">确 定</el-button>
        </div>
    </el-dialog>


    <el-dialog title="文档内容" :visible.sync="dialogContentVisible" width="40%">
        <!-- <el-form :model="form">
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="form.content" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form> -->

        <template >
          <div class="showContent" v-html='form.content'></div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogContentVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogContentVisible = false">确 定</el-button>
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
import { getPostListByOther,deletePost,updatePost,getPostLabel,getTags }  from '@/api/api'
import { getCookie } from '@/utils/cookie'
import { del } from 'vue'
import { Alert } from 'element-ui'
export default {

    dicts: ['sys_job_group'],
    data() {
      return {
        tableData: [],
        page:1,
        per_page:10,
        total:0,
        loading:true,
        formInline:{
            authorName: '',
            title: '',
        },
        dialogFormVisible:false,
        form:{
            postId: '',
            title: '',
            tags:'',
            summary:'',
            status: 0,
        },
        formLabelWidth: '90px',
        showSearch: true,
        // 非多个禁用
        multiple: true,
        // 日期范围
        dateRange: [],
        // 非单个禁用
        single: true,
        ids: [],
        dicts:[],
        currentData: [],
        tags:[],
        dialogContentVisible: false
      }
    },
    created(){
        this.getData({page: this.page,per_page:this.per_page})
        this.getLabel()
        this.getTags({})
    },
    methods:{
        getData(params){
            //postList(params)
            getPostListByOther({
              page: this.page,
              per_page:this.per_page,
              authorId:getCookie('userId'),
            })
            .then(res =>{
                this.loading = false
                if(res.code === 100000){
                    this.total = res.data.totalSize
                    this.tableData =res.data.data
                    //loading = false
                }
            })
        },
        getDataByOther(){
            getPostListByOther({
              page: this.page,
              per_page:this.per_page,
              authorName:this.formInline.authorName,
              status:this.formInline.status,
              title:this.formInline.title,
              startTime: this.dateRange[0],
              endTime: this.dateRange[1]
            })
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
            
        },
        onSubmit(){
            console.log('data',this.dateRange)
            this.getDataByOther()
        },
        onReset(){
            this.reset()
            this.getData({page: this.page,per_page:this.per_page})
        },
        updatePostMessage(){
            this.dialogFormVisible =true
        },
        // 多选框选中数据
        handleSelectionChange(selection,rows) {
          this.ids = selection.map(item => item.postId);
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

          //this.single = row.length != 1;
          //this.multiple = !row.length;
          if (row) {
            this.$refs.singleTable.clearSelection();
            //this.$refs.singleTable.setCurrentRow(row);
            this.$refs.singleTable.toggleRowSelection(row);
          }
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            //const userIds = row.userId || this.ids;
            let result=100000;
            const postId =row.postId ||   this.ids.toString();
            console.log('ROW',row)
            this.$modal.confirm('是否确认删除编号为"' + postId + '"的数据项？').then(function() {
                return deletePost({ids:postId}).then(res=>{
                    result = res.code
                });
            }).then(() => {
                if(result === 100000){
                  this.refreshData();
                  this.$modal.msgSuccess("删除成功");
                }else{
                  this.$modal.msgError("删除失败");
                }
            }).catch(() => {});
        },
        /** 修改按钮操作 */
        handleUpdate(row) {

          this.reset();
          this.getTreeselect();
          this.dialogFormVisible =true
          
          console.log('row1',row)    
          console.log('ids',this.ids)   
          console.log('item',this.currentData)
          this.form.postId = row.postId       
          this.form.summary= row.summary
          this.form.tags =row.tags
          this.form.title =row.title,
          this.form.status = row.status
        },
        topUpdate(row) {
          this.reset();
          this.getTreeselect();
          this.dialogFormVisible =true
          const updateItem = this.currentData[0]  
          this.form.summary= updateItem.summary
          this.form.tags =updateItem.tags
          this.form.title =updateItem.title,
          this.form.status = updateItem.status
          this.form.postId = updateItem.postId

        },

        handContent(row){
          this.reset();
          this.getTreeselect();
          this.dialogContentVisible =true
          
          console.log('ids',this.ids)   
          console.log('item',this.currentData)
          this.form.postId = row.postId       
          this.form.summary= row.summary
          this.form.tags =row.tags
          this.form.title =row.title,
          this.form.status = row.status
          this.form.content = row.content
        },
        toShowContent(row){
          this.reset();
          this.getTreeselect();
          this.dialogContentVisible =true
          const updateItem = this.currentData[0]  
          this.form.summary= updateItem.summary
          this.form.tags =updateItem.tags
          this.form.title =updateItem.title,
          this.form.status = updateItem.status
          this.form.postId = updateItem.postId
          this.form.content = updateItem.content
        },
        sumbitForm(){
          updatePost(this.form).then(response =>{
            console.log("response",response)
            this.dialogFormVisible =false
            if(response.code === 100000){
                this.$modal.msgSuccess("修改成功");

                this.total = response.data.totalSize
                this.tableData =response.data.data
                this.refreshData();
            }else{
                this.$message({message: response.message,type : 'error'})
            }
          }).catch(err =>{
              this.dialogFormVisible =true
              console.error(err)
          })
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        reset(){
            this.formInline.authorName ='',
            this.formInline.status =0,
            this.formInline.title=''
            this.form.summary= ''
            this.form.tags = ''
            this.form.title = '',
            this.form.status = 0
            this.form.postId =''
            this.dateRange= []
        },
        getTreeselect (){

        },
        refreshData(){
          this.getData({page: this.page,per_page:this.per_page});
        },
        getLabel(){
          getPostLabel({
            label: '1'
          })
          .then(res =>{
                this.loading = false
                console.log('label',res)
                if(res.code === 100000){
                    //this.total = res.data.totalSize
                    this.dicts =res.data
                    //loading = false
                }
          })
        },
        getStatus(row, column){
            console.log('id',row.status)
            const selectedName = this.dicts.find((item)=>{
              console.log('ie',item)
              return item.labelName === row.status;
              //筛选出匹配数据，是对应数据的整个对象
            });
            if(selectedName){
              console.log('status',selectedName.labelValue)
              return selectedName.labelValue
            }
        },

        getTags(params){
            getTags(params)
                .then(res =>{
                    //this.loading = false
                    if(res.code === 100000){
                        this.tags =res.data
                    }
            })
      },
    },
        
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

.showContent{
  border:1px solid gray;
}
}
</style>