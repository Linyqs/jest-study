### 单元测试

#### 1. 环境准备

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

#### 2. 基础函数测试

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

**⑤专门测试，跳过其他测试**

用于重点排查一些错误，可以使用only，例：

```
test.only('...', () => {
  expect(true).toBe(false);
});
```

#### 3. 异步函数测试

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

**①直接调用测试：**

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

可以发现打印没有被执行，直接测试成功，等不及callback执行，直接跳过了。

**②对①进行改进，使用done**

```
test("call the async function with done", done => {
  function callback(info) {
    try{
      expect(info).toBe("success");
      done();
    }catch(err) {
      done(err);
    }
  }
  fetchData(callback);
})
```

jest测试会等待done被执行，如果没有任何done被执行，则会发生超时错误，所以我们要使用try...catch来捕获异常，所以此处会等待expect被执行。

**③使用返回一个promise的方法**

注意点就是一定要return!!!

调用的函数

```
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
```

jest测试，以下都会通过

```
test("use promise when resolve", () => {
  return Asynchronous().then(res => {
    expect(res).toBe("success")
  })
})
test("use promise when resolve", () => {
  return AsynchronousFailed().catch(err => {
    expect.assertions(1);
    expect(err).toBe("failed")
  })
})
```

可以发现此处用到了`expect.assertions`，顾名思义，此处就是声明断言的次数，经常用于异步的代码中，为了确保断言的回调能够按照预期进行。

[expect.assertions](https://www.bookstack.cn/read/jest-v24.1/spilt.6.30.md)

**④直接测试resolve/reject**

同样的需要return返回才会等待异步的执行，注意是resolve + s， reject + s

```
test("judge resolve directly", () => {
  return expect(Asynchronous()).resolves.toBe("success")
})

test("judge reject directly", () => {
  return expect(AsynchronousFailed()).rejects.toBe("failed")
})
```

如果使用async，await则可以改写成：

```
test("judge reject directly when use async", async () => {
  await expect(AsynchronousFailed()).rejects.toBe("failed")
})

test("judge reject directly when use async", async () => {
  await expect(AsynchronousFailed()).rejects.toBe("failed")
})
```

#### 4. 生命周期

- 当我们需要在每个单元测试前都执行某些操作，我们可以使用`beforeEach`，相应的也有每次执行结束之后的方法：`afterEach`;

- 如果我们需要在每次测试的开头，有且进执行一次，则可以使用`beforeAll`， 对应结束之后的方法：`afterAll`。

- 如果是对特定的单元测试，特定时候执行某些操作，则可以使用`describe`块包裹起来，这样在块中定义的方法只有对内部起作用。

举个例子:

```
import { sum } from './functionModules';

beforeEach(() => console.log("beforeEach-1"));
afterEach(() => console.log("afterEach-1"));
beforeAll(() => console.log("beforeAll-1"));
afterAll(() => console.log("afterAll-1"));
test("test1", () => console.log("test1"));
console.log("outer")
describe("test2", () => {
  beforeEach(() => console.log("beforeEach-2"));
  afterEach(() => console.log("afterEach-2"));
  beforeAll(() => console.log("beforeAll-2"));
  afterAll(() => console.log("afterAll-2"));
  test("child test", () => {
    console.log("test2")
    expect(sum(1, 2)).toBe(3)
  })
  console.log("inner")
})
test("test3", () => console.log("test3"));
```

优先级规则：

```
beforeAll ->
beforeEach ->  测试内容1 -> afterEach
beforeEach ->  测试内容2 -> afterEach
// 如果有describe， 继续按照此规则
afterAll
```

注意describe中的test执行时，全局的beforeEach也会被执行，jest会在真正测试开始之前执行所有其他代码，默认按测试顺序执行，执行结果如下：

```
outer
inner
beforeAll-1
// 执行外层第一个test
beforeEach-1
test1
afterEach-1
// 执行describe块
beforeAll-2
beforeEach-1
beforeEach-2
test2
afterEach-2
afterEach-1
afterAll-2
// 执行外层第二个test
beforeEach-1
test3
afterEach-1
afterAll-1
```

####  5. mock函数

我们可以擦除函数的实际实现，使用mock函数

- 捕获对函数的调用
- 改变内部结构
- 在使用 `new` 实例化时捕获构造函数的实例
- 允许测试时配置返回值

下面介绍几种mock函数中常用的方法和属性：

**① jest.fn()**

使用mock函数，我们可以根据特定的方法或者mock属性获取返回值，调用参数，调用情况等等。

```
test("mock function", () =>{
  let fn = jest.fn();
  // 使用mockReturnValueOnce可以链式设置返回值
  fn.mockReturnValueOnce('a').mockReturnValueOnce('b');
  let res1 = fn(1, 2), res2 = fn(3, 4);
  
  // 获取返回值
  expect(res1).toBe('a');
  expect(res2).toBe('b');
  expect(fn.mock.results[0].value).toBe('a');
  expect(fn.mock.results[1].value).toBe('b');

  // 是否被调用了
  expect(fn).toBeCalled();

  // 判断调用的次数
  expect(fn).toBeCalledTimes(2);
  expect(fn.mock.calls.length).toBe(2);

  // 判断调用的参数
  expect(fn).toHaveBeenCalledWith(1, 2);
  expect(fn).toHaveBeenCalledWith(3, 4);

  // 第一次调用的第一个参数值
  expect(fn.mock.calls[0][0]).toBe(1);
}, [])
```

使用mock promise函数

```
test('test jest.fn() by Promise', async () => {
  let fn = jest.fn().mockResolvedValue('a');
  let res = await fn();
  expect(res).toBe('a');
  expect(Object.prototype.toString.call(fn())).toBe("[object Promise]");
})
```

测试axios请求的API：

```
/**
 * axios 请求函数
 * @param { function } callback
 */
export async function getToDoList(callback) {
     return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
          callback(res.data)
          return res;
     })
}
```

对应的jest测试：

```
test("test axios", async () => {
  expect.assertions(1);
  let fn = jest.fn();
  await getToDoList(fn); 
  console.log(fn.mock.calls[0][0].data) // 打印出结果
  expect(fn).toBeCalledTimes(1); // 判断fn是否被调用了一次
})
```

还可以不调用具体的`API`，通过mock返回假数据，即：fake response

```
import axios from 'axios';
import { getToDoList } from './functionModules';
jest.mock('axios');

test("pretend to call axios api", async () => {
  let myResult = { data: [{id: 1, title: "get up early", complete: false}] };
  axios.get.mockResolvedValue(myResult);
  //axios.get.mockImplementation(() => Promise.resolve(myResult))
  return getToDoList(() => {}).then(data => expect(data).toEqual(myResult));
})
```

注意此处要和上面的代码分开两个文件，否则会影响真实API测试的结果。当我们需要定义一个模块函数的默认实现时，我们可以使用`mockImplementation`来模拟数据，如上，使用注释的语句，测试也能通过。

[以下代码来自官网](https://jestjs.io/docs/zh-Hans/mock-functions)

```
// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
```

同样可以根据调用顺序设置返回值，当mockImplementationOnce定义的都执行完成了，则会执行jest.fn中定义的。

```
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```