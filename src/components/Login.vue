<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-02 19:38:24
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:36:47
 * @FilePath: /vuetest/src/components/Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Login</span>
        </div>
    
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">

        <el-form-item label="用户名" prop="username"
      
        >
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
       >
            <el-input type ="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form>
    </el-card>


  </div>
</template>/

<script>
import { nameRule, passRule } from '../utils/vaildate.js' 
import { setCookie } from  '@/utils/cookie.js'
import { login } from '@/api/api.js'
export default {
    data(){
        // const validateName = (rule,value,callback)=>{
        //     let reg = /(^[a-zA-Z0-9]{4,10}$)/
        //     if(value === ''){
        //         callback(new Error('请输入用户名'))
        //     } else if (!reg.test(value)){
        //         callback(new Error('请输入4-10位用户名'))
        //     } else{
        //         callback()
        //     }
        // }
        // const validatePassword = (rule,value,callback)=>{
        //     let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
        //     if(value === ''){
        //         callback(new Error('请输入密码'))
        //     } else if (!reg.test(value)){
        //         callback(new Error('请输入6-12位密码,密码需要包括大小写字母和数字及特殊符号'))
        //     } else{
        //         callback()
        //     }
        // }
        return{
            
            form:{
                username:'',
                password:''
            },
            rules:{
                username: [{validator: nameRule,trigger: 'blur'}],
                password: [{validator: passRule,trigger: 'blur'}]
            }
        }
    },
    methods:{
        login(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    console.log("form",this.form);
                    login(this.form).then(res =>{

                        if(res.code === 100000){
                            console.log('login',res)
                            setCookie('token',res.data)
                            //setCookie('token','')

                            setCookie('username',this.form.username)

                            this.$message({message: res.message,type : 'success'})
                            this.$router.push('/home/post')
                        }else{
                            this.$message({message: res.data,type : 'error'})
                        }
                        
                    }).catch(err =>{
                        console.error(err)
                    })
                    // this.service.post('server/server',this.form)
                    // .then(res =>{
                    //     setCookie('token','123')
                    //     console.log(res)
                    //     this.$message({message: res.message,type : 'success'})
                    //     this.$router.push('/home')
                    // }).catch(err =>{
                    //     console.error(err)
                    // })
                    // this.axios.post('http://localhost:6001/server/server',this.form)
                    // .then(res =>{
                    //     console.log(res)
                    //     if(res.status === 200){
                    //         //localStorage.setItem('username',res.data.username)
                    //         //localStorage.setItem('data',res.data)
                    //         setCookie('data',res.data)
                    //         //this.$message({message: res.data.message,type: 'success'})
                    //         this.$router.push('/home')
                    //     }
                    // })
                    // .catch(err =>{
                    //     console.error(err)
                    // })
                }else{
                    console.log('无效')
                }
            })
        }
    }
}
</script>

<style>
.login {
    width:100%;
    height:100%;
    position: absolute;
    margin: 0;
    background-color: burlywood;
    
}
.login .box-card {
    width: 450px;
    margin: 200px auto;
        
}
.login .box-card .el-card__header{
    font-size: 100;
}
.login .box-card .el-button{
    width:100%
}
</style>