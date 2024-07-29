/**
 * 在demo2的基础上进行优化
 * 1.将发送请求数据进行封装,封装到demo3.js文件中进行调用
 *      用到了 await 同步等待结果关键字,async 异步方法关键字(这里没有演示,因为拦截器已经是异步请求了),await请求必须写在async修饰的方法中
 * 2.将请求域名前缀进行分装,使用axios.create方法
 * 3.使用axios拦截器,将每次请求都会响应的then或catch处理进行封装
 */

// 导入js,"@/"表示src当前目录下
import request from "@/demo3/request.js";

/**获取列表数据请求,通常一...Service结尾 */
export function articleControllerGetAllService(){
    return request.post("articleController/getAll");
}

/**搜索请求 */
export function articleControllerSearchService(searchConditions){
    return request.post("articleController/search", searchConditions);
}