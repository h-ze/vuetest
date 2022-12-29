<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:29
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-14 21:58:26
 * @FilePath: /vuetest/src/components/post/PublishPost.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="publishPost">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>

          <el-form-item label="文章标签" >
            <el-select v-model="form.tags" placeholder="请选择文章标签">
              <el-option
                v-for="tag in tags"
                :key="tag.name"
                :label="tag.name"
                :value="tag.name"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.tags"></el-input> -->
          </el-form-item>

          <el-form-item label="文章概要" prop="summary">
            <el-input v-model="form.summary" placeholder="请输入文章概要"></el-input>
          </el-form-item>

          <el-form-item label="文章状态">
            <el-select v-model="form.status" placeholder="请选择文章对外发布的状态">
              <el-option
                v-for="status in docStatus"
                :key="status.labelName"
                :label="status.labelValue"
                :value="status.labelName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="内容" prop="rulercontent">
            <Editor ref="editor"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" >立即创建</el-button>
            <el-button type="primary" @click="onSubmit">定时发布</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      
  </div>
</template>

<script>
// import Editor from '@/components/Editor'
import { addPost,getPostOptionsStatus,getTags }  from '@/api/api'
import { getCookie } from '../../utils/cookie';
import { summaryRule, titleRule,contentRule } from '@/utils/vaildate.js' 
export default {
  data() {
      return {
        form: {
          authorId: 0,
          channelId: 0,
          comments: 0,
          favors: 0,
          featured: 0,
          id: 0,
          postId: 0,
          status: '',
          summary: '',
          tagId: 0,
          tags: '',
          thumbnail: '',
          title: '',
          views: 0,
          weight: 0,
          content: ''
        },
        content: '',
        docStatus:[],
        tags:[],
        rules:{
            title: [{validator: titleRule,trigger: 'blur'}],
            summary: [{validator: summaryRule,trigger: 'blur'}],
            rulercontent:[{validator:contentRule,trigger: 'blur'}]
        }
      }
    },
    created(){
      this.getStatus()
      this.getTags({})
    },
    methods: {
      onSubmit(form) {
          this.$refs[form].validate((valid) => {
              if(valid){
                  console.log('submit!');
                  console.log('form',this.form)
                  console.log("form",this.form);
                  console.log('content',this.$refs.editor.currentValue)
                  this.form.content = this.$refs.editor.currentValue
                  console.log('form1',this.form)

                  addPost(this.form).then(res =>{
                      if(res.code === 100000){
                          console.log('onSubmit',res)
                          this.$modal.msgSuccess("发表成功");
                          this.resetForm()
                      }else{
                          this.$message({message: res.data,type : 'error'})
                      }
                      
                  }).catch(err =>{
                      console.error(err)
                  })
              }
          })
      },
      getStatus(){
          getPostOptionsStatus({
            status: '1'
          })
          .then(res =>{
                //this.loading = false
                console.log('label2',res)
                if(res.code === 100000){
                    //this.total = res.data.totalSize
                    this.docStatus =res.data

                    this.form.status = res.data[0].labelName 
                    //loading = false
                }
          })
      },
      getTags(params){
        getTags(params)
              .then(res =>{
                  //this.loading = false
                  if(res.code === 100000){
                      this.tags =res.data
                      this.form.tags = res.data[0].name 
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
      resetForm(){

        this.form.status = this.docStatus[0].labelName,
        this.form.authorId= 0,
        this.form.channelId= 0,
        this.form.comments= 0,
        this.form.favors= 0,
        this.form.featured= 0,
        this.form.id= 0,
        this.form.postId= 0,
        this.form.summary= '',
        this.form.tagId= 0,
        this.form.tags= this.tags[0].name,
        this.form.thumbnail= '',
        this.form.title= '',
        this.form.views= 0,
        this.form.weight= 0,
        this.form.content= '',
        this.content= ''

      }

      
      
    }
    // components:{
    //   Editor
    // }
}
</script>

<style lang="scss">
.publishPost{
  .el-form{
        text-align: left;
    }
}
</style>