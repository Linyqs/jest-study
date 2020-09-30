// 1. 简单的计算函数
export function sum(a, b) {
     return a + b;
}

// 2. 返回对象
export function returnObj(age) {
     return {
          name: "小哈",
          age: age + 1
     }
}

// 3. 抛出异常
export function throwError() {
     throw new Error("i am sorry,there has something wrong!")
}