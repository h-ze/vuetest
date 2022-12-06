<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 15:28:29
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-03 16:08:15
 * @FilePath: /vuetest/src/components/post/PublishPost.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="publishPost">
      <el-form ref="form" :model="form" label-width="80px">
        
          <el-form-item label="标题" >
            <el-input v-model="form.title"></el-input>
          </el-form-item>


          

          <el-form-item label="内容" >
            <Editor/>
          </el-form-item>

          <!-- <el-form-item label="标签">
            <el-input v-model="form.name"></el-input>
          </el-form-item> -->

          <el-form-item label="标签">
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
          </el-form-item>
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
import { addPost }  from '@/api/api'
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
          status: 0,
          summary: "vue",
          tagId: 0,
          tags: "vue",
          thumbnail: "vue",
          title: "vue",
          views: 0,
          weight: 0
        }
      }
    },
    methods: {
      onSubmit(form) {
        console.log('submit!');
        console.log('form',this.form)
        
        console.log("form",this.form);
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