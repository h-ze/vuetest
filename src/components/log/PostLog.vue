<template>
  <div class="postLog">
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
  </div>
</template>

<script>
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
    methods:{
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
.postLog{
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