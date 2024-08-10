/**导入拦截器 */
import request from '@/utils/request.js'

//文章分类列表查询
export const articleCategoryListService = ()=>{
    return request.post("articleCategoryController/getAll");
}

//文章分类添加
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData)=>{
   return request.put('/category',categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id='+id)
}

//文章列表查询
export const articleListService = (params)=>{
   return request.get('/article',{params:params})
}

//文章添加
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData);
}