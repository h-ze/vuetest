<!--
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-01 21:25:59
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:38:03
 * @FilePath: /vuetest/src/components/Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <!-- <h1>hello</h1>
    <el-button>hello</el-button>
    <el-button type ="primary">hello</el-button>
    <el-button type ="info">hello</el-button>
    <el-button type ="danger">hello</el-button>
    <el-button type ="success">hello</el-button>
    <el-Tag >hahaha</el-Tag>
    <i class="fa fa-user"></i> -->

    <Header/>
    <el-container class="content">
        <Menu/>
        <el-container>
          <el-main>
            <BreadcrumbVue/>
            <div class="cont">
              <router-view></router-view>
            </div>
          </el-main>
        <el-footer>
          <Footer/>
        </el-footer>
        </el-container>
    </el-container>


    
  </div>
</template>

<script>
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'
import Menu from './common/Menu.vue'
import BreadcrumbVue from './common/Breadcrumb.vue'
//import Tabs from './common/Tabs.vue'

export default {
    components:{
      Header,
      Footer,
      Menu,
      BreadcrumbVue,
    },

    
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.home{
  //background-color: green;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .cont {
      margin: 20px;
    }
  }
}
</style>
