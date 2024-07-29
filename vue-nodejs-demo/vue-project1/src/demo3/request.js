/**
 * 使用axios拦截器,将每次请求都会响应的then或catch处理进行封装
 */

// 定制请求实例
// 导入 axios
import axios from "axios";
// 定义一个公共的变量记录前缀域名
const baseURL = "http://localhost:8080/";
const requestURL = axios.create({ baseURL });

// 添加响应拦截器,本身就是异步请求,所以调用方demo3中不用加 await 同步等待结果关键字,async 异步方法关键字
requestURL.interceptors.response.use(
    // 成功的回调
    result => {
        return result.data;
    },
    // 失败的回调
    err => {
        console.log("请求返回异常");
        // 异步状态转换成失败状态
        return Promise.reject(err);
    }
);

export default requestURL;