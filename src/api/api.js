/*
 * @Author: hz hz15858@163.com
 * @Date: 2022-12-03 14:24:46
 * @LastEditors: hz hz15858@163.com
 * @LastEditTime: 2022-12-31 20:32:43
 * @FilePath: /vuetest/src/api/api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from "@/service";

export function login(data){
    return service({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
        method:'post',
        url: 'user/login',
        data
    })
}

export function addPost(data){
    return service.post('postController/addPost',data)
}

export function addPostOnTiming(data){
    return service.post('postController/addPostOnTiming',data)
}

export function postList(param){
    return service.get('postController/getPosts',{params: param || {}})
    // return service({
    //     method: 'get',
    //     url: 'postController/getPosts',
    //     params:{
    //         page: param.page,
    //         per_page: param.per_page
    //     }
    // })
}

export function getPostListByOther(params){
    return service.get('postController/getPostListByOther',{params: params|| {}})

    // return service({
    //     method: 'get',
    //     url: 'postController/getPostListByOther',
    //     params
    // })
}

export function getLogs(params){
    return service.get('log/loginLogs',{params: params|| {}})

}

/**
 * 获取博客相关日志
 * @param {*} params 
 * @returns 
 */
export function getPostLogs(params){
    return service.get('log/postLogs',{params: params|| {}})

}

/**
 * 获取所有的tag
 * @param {*} param 
 * @returns 
 */
export function getTags(params){
    return service.get('tagController/getTags',{params: params|| {}})
}

export function addTags(data){
    return service.post('tagController/addTag',data)
}

export function updateTags(data){
    //return service.putForm('tagController/updateTag',{params: params|| {}})
    return service({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
        method:'put',
        url: 'tagController/updateTag',
        data
    })
}

export function deleteTags(params){
    return service.delete('tagController/deleteTag',{params: params|| {}})
}

/**
 * 删除指定的博客
 * @param {} params 
 * @returns 
 */
export function deletePost(params){
    return service.delete('postController/deletePost',{params: params || {}})
}

export function updatePost(data){
    //return service.put('postController/updatePost',);
    return service({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
        method:'put',
        url: 'postController/updatePost',
        data
    })
}


export function getPostOptionsStatus(params){
    return service.get('status/getOptionsStatus',{params: params|| {}})
}

export function getPostStatus(params){
    return service.get('status/getStatus',{params: params|| {}})
}

export function addPostStatus(data){
    return service.post('status/addStatus',data)
}

export function updatePostStatus(data){
    return service({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
        method:'put',
        url: 'status/updateStatus',
        data
    })
}

export function deletePostStatus(params){
    return service.delete('status/deleteStatus',{params: params||{}})
}

export function getPostNum(params){
    return service.get('postController/getPostNum',{params: params || {}})
}

export function getPostTiming(params){
    return service.get('timingPost/getTimingPost',{params: params || {}})
}

export function deletePostTiming(params){
    return service.delete('timingPost/deleteTimingPost',{params: params||{}})
}

export function updatePostTiming(data){
    return service({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
        method:'put',
        url: 'timingPost/updateTimingPost',
        data
    })
}