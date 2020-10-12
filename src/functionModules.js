import axios from 'axios';

/**
 * 简单的计算函数a+b
 * @param {number} a 
 * @param {number} b 
 */
export function sum(a, b) {
     return a + b;
}

/**
 * 返回对象
 * @param {number} age 
 */
export function returnObj(age) {
     return {
          name: "小哈",
          age: age + 1
     }
}

/**
 * 抛出异常
 */
export function throwError() {
     throw new Error("I'm sorry,there has something wrong!")
}

/**
 * 带有异步回调函数
 */
export function fetchData(callback) {
     try {
          setTimeout(() => {
               callback("success");
          }, 2000)
     }catch(err) {
          callback("failed");
     }
}

/**
 * 返回异步函数
 */
export function Asynchronous() {
     return new Promise((resolve, reject) => {
          try {
               setTimeout(() => {
                    resolve("success")
               }, 2000)
          }catch(err) {
               reject("failed")
          }
     })
}

/**
 * 返回异步函数，发生错误情况reject
 */
export function AsynchronousFailed() {
     return new Promise((resolve, reject) => {
          try {
               throw Error("failed");
          }catch(err) {
               reject("failed")
          }
     })
}

/**
 * axios 请求函数
 * @param { function } callback
 */
export async function getToDoList(callback) {
     return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
          callback(res.data);
          return res;
     })
} 