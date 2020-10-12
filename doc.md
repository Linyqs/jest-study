### 1. 单元测试

#### 1.1环境准备

**初始项目**

```
cnpm init
//或者
yarn init
```

**安装jest**

```
cnpm install --save-dev jest
// 或者
yarn add --dev jest
```

**下载和配置babel**

（如果不使用ES6语法，则可以跳过此步骤）

```
cnpm install @babel/plugin-transform-modules-commonjs --save-dev
```

新建一个.babelrc文件，写入如下内容，或者直接在package.json中配置。

```
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
```

#### 1.2 基础函数测试

**① toBe** 

精确的比较，本质是用Object.is来比较，取反使用not.toBe

```
export function sum(a, b) {
     return a + b;
}
```

```
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

```

**② toEqual**

可以用来比较对象的值是否相同

```
export function returnObj(age) {
     return {
          name: "小哈",
          age: age + 1
     }
}
```

```
test('compare object', () => {
    let result = returnObj(10);
    expect(result).toEqual({name: "小哈", age: 11 });
    expect(result).toBe({name: "小哈", age: 11 });
});
```

**③ 函数抛出异常的测试**

```
// 3. 抛出异常
export function throwError() {
     throw new Error("i am sorry,there has something wrong!")
}
```

```
test('test error funciton', () => {
    expect(throwError).toThrow(Error);
})
```

**④ 其他可以根据特定的情况选择方法**

```
test('sth special in need', () => {
    let data1 = null, data2, data3 = 0.1 + 0.2;
    expect(data1).toBeNull;
    expect(data2).toBeDefined;
    expect(data3).toBeCloseTo(0.3);
    expect(1 === 1).toBeTruthy();
    expect(0 === 1).toBeFalsy();
})
```

浮点数的比较，由于精度的差异，则可以使用toBeCloseTo来比较

#### 1.3异步函数测试

在js中最常见的就是请求异步函数了，业务中基本都是增删改查，CURD；如果在测试中直接使用回调函数，但是jest测试执行到末尾就会结束，不会等待回调完成；

**举个例子：**

异步函数定义

```
export function fetchData(callback) {
     try {
          setTimeout(() => {
               callback("success");
          }, 2000)
     }catch(err) {
          callback("failed");
     }
}
```

直接调用测试：

```
import { fetchData, Asynchronous } from './functionModules';
test("call the async function directly", () => {
  function callback(info) {
      expect(info).toBe("success");
      console.log("I'm callback function, I have performed")
  }
  fetchData(callback);
})
```

可以发现



