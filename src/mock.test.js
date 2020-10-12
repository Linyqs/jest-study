test("mock function", () =>{
  let fn = jest.fn();
  // 设置返回值，使用mockReturnValueOnce可以链式设置
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

test('test jest.fn() by Promise', async () => {
  let fn = jest.fn().mockResolvedValue('a');
  let res = await fn();
  expect(res).toBe('a');
  expect(Object.prototype.toString.call(fn())).toBe("[object Promise]");
})

test("test axios", async () => {
  expect.assertions(1);
  let fn = jest.fn();
  await getToDoList(fn);
  console.log(fn.mock.calls[0][0].data)
  expect(fn).toBeCalledTimes(1);
})


