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
      <el-form ref="form" :model="form" label-width="80px">
        
          <el-form-item label="标题" >
            <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>

          <el-form-item label="文章标签">
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

          <el-form-item label="文章概要">
            <el-input v-model="form.summary" placeholder="请输入文章概要"></el-input>
          </el-form-item>

          <el-form-item label="文章状态">
            <el-select v-model="form.status" placeholder="请选择文章对外发布的状态">
              <el-option
                v-for="dict in dicts"
                :key="dict.labelName"
                :label="dict.labelValue"
                :value="dict.labelName"
              ></el-option>
            </el-select>
          </el-form-item>
          

          <el-form-item label="内容" >
            <Editor ref="editor"/>
          </el-form-item>

          

          <!-- <el-form-item label="标签">
            <el-input v-model="form.name"></el-input>
          </el-form-item> -->

          <!-- <el-form-item label="标签">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分类">
            <el-select v-model="form.region1" placeholder="请选择活动区域">
              <el-option label="test1" value="test1"></el-option>
              <el-option label="test2" value="test2"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item> -->
          <!-- <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button type="primary" @click="onSubmit">定时发布</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      
  </div>
</template>

<script>
// import Editor from '@/components/Editor'
import { addPost,getPostLabel,getTags }  from '@/api/api'
import { getCookie } from '../../utils/cookie';
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
          weight: 0
        },
        content: '',
        dicts:[],
        tags:[]
      }
    },
    created(){
      this.getLabel()
      this.getTags({})
    },
    methods: {
      onSubmit(form) {
        console.log('submit!');
        console.log('form',this.form)
        console.log("form",this.form);
        console.log('content',this.$refs.editor.currentValue)
        addPost(this.form).then(res =>{

            if(res.code === 100000){
                console.log('onSubmit',res)

            }else{
                this.$message({message: res.data,type : 'error'})
            }
            
        }).catch(err =>{
            console.error(err)
        })
                    
                
      },

      getLabel(){
          getPostLabel({
            label: '1'
          })
          .then(res =>{
                //this.loading = false
                console.log('label2',res)
                if(res.code === 100000){
                    //this.total = res.data.totalSize
                    this.dicts =res.data
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