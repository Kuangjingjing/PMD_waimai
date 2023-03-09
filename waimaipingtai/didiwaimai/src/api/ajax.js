// 封装axios库
// get 或者 post
/*ajax 请求函数模块
*/
// 导入axios库
import axios from 'axios'
// 开放请求方法
// url=> 后端url接口
// data => 请求的参数
// type => 请求类型 get或post
export default function ajax(url = '', data = {}, type = 'GET') {
    // 返回的是promise （1）返回一个未来要发生的事件 （2）解决回调地狱，帮助程序员友好的开发
    //resolve=>ok状态
    //reject=>失败状态
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {
            // 准备 url query 参数数据
            let dataStr = '' // 数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送 get 请求
            promise = axios.get(url)
        } else {
            // 发送 post 请求
            promise = axios.post(url, data)
        }
        promise.then(response => {
            
            resolve(response.data)//返回后端数据
        })
            .catch(error => {
                reject(error)//后端没有成功返回响应数据 暴露一些错误
            })
    })
}