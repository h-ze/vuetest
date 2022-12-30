/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-02 19:15:20
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-28 20:29:29
 * @FilePath: /vuetest/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'

//import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true,
            component: () => import('@/components/Login')
        },
        {
            path: '/login',
            name: 'Login',
            hidden: true,
            component: () => import('@/components/Login')
        },
        {
            path: '*',
            name: 'NotFound',
            hidden: true,
            component: () => import('@/components/NotFound')
        },
        // {
        //     path: '/home',
        //     component: resolve => require(['@/components/Home'], resolve )
        // }
        {
            path: '/home',
            name: '文章管理',
            iconClass: 'fa fa-modx',
            redirect: '/home/post',
            component: resolve => require(['@/components/Home'], resolve ),
            children:[
                {
                    path: '/home/post',
                    name: '文章列表',
                    iconClass: 'fa fa-delicious',
                    component: () => import('@/components/post/PostList')
                },
                {
                    path: '/home/publishPost',
                    name: '发布文章',
                    iconClass: 'fa fa-dropbox',
                    component: () => import('@/components/post/PublishPost')
                },
                {
                    path: '/home/PostTag',
                    name: 'Tag列表',
                    iconClass: 'fa fa-empire',
                    component: () => import('@/components/post/PostTag')
                },
                {
                    path: '/home/PostStatus',
                    name: 'Status列表',
                    iconClass: 'fa fa-empire',
                    component: () => import('@/components/post/PostStatus')
                },
                // {
                //     path: '/home/Editor',
                //     name: 'Editor',
                //     iconClass: 'fa fa-list',
                //     component: () => import('@/components/Editor/index')
                // }
            ]
        },
        

        {
            path: '/home/log',
            name: '日志管理',
            iconClass: 'fa fa-list',
            redirect: '/home',
            component: resolve => require(['@/components/Home'], resolve ),
            children:[
                {
                    path: '/home/log/loginLog',
                    name: '登录日志',
                    iconClass: 'fa fa-gratipay',
                    component: () => import('@/components/log/LoginLog')
                },
                {
                    path: '/home/log/operatorLog',
                    name: '操作日志',
                    iconClass: 'fa fa-opera',
                    component: () => import('@/components/log/PostLog')
                },
            ]
        },

        {
            path: '/home/comment',
            name: '评论管理',
            iconClass: 'fa fa-list',
            redirect: '/home',
            component: resolve => require(['@/components/Home'], resolve ),
            children:[
                {
                    path: '/home/comment/mycomment',
                    name: '文档评论',
                    iconClass: 'fa fa-gratipay',
                    component: () => import('@/components/comment/MyComment')
                },
                
            ]
        },

        {
            path: '/home/data',
            name: '数据管理',
            iconClass: 'fa fa-list',
            redirect: '/home',
            component: resolve => require(['@/components/Home'], resolve ),
            children:[
                {
                    path: '/home/comment/postData',
                    name: '文档数据',
                    iconClass: 'fa fa-gratipay',
                    component: () => import('@/components/data/PostData')
                },
                
            ]
        },

        {
            path: '/home/setting',
            name: '设置中心',
            iconClass: 'fa fa-list',
            redirect: '/home',
            component: resolve => require(['@/components/Home'], resolve ),
            children:[
                {
                    path: '/home/setting/setting',
                    name: '设置',
                    iconClass: 'fa fa-gratipay',
                    component: () => import('@/components/setting/Setting')
                },
                
            ]
            
        },


        {
            path: '/home/user',
            //component: Layout,
            //hidden: true,
            name: '个人中心',
            iconClass: 'fa fa-list',
            redirect: '/home',
            component: resolve => require(['@/components/Home'], resolve ),
            children: [
              {
                path: '/home/user/profile',
                component: () => import('@/components/system/user/index'),
                name: '个人信息',
                //meta: { title: '个人中心', icon: 'user' }
              }
            ]
        },

    ],
    mode: 'history'
})