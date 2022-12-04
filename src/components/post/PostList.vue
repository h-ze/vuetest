<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:35
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-04 14:45:47
 * @FilePath: /vuetest/src/components/post/PostList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="postList">
    <el-table :data="tableData" v-loading= "loading" border style="width: 100%">
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
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.postId)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-update" @click="del(scope.postId)"></el-button>
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
import { postList }  from '@/api/api'
import { del } from 'vue'
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
        loading:false
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.per_page =val;
            this.page =1
            this.getData({page: this.page,per_page:this.per_page})
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page =val
            this.getData({page: this.page,per_page:this.per_page})
        },
        del(){

        }
    }
  }
</script>

<style lang="scss">
.postList{
    .el-pagination{
        text-align: left;
        margin-top: 20px;
    }
}
</style>