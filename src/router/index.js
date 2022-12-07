/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-02 19:15:20
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-05 21:41:00
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
                    path: '/home/PostTab',
                    name: '文章Tab列表',
                    iconClass: 'fa fa-empire',
                    component: () => import('@/components/post/PostTab')
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
        }
    ],
    mode: 'history'
})