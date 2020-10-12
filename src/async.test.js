import { fetchData, Asynchronous, AsynchronousFailed } from './functionModules';
test("call the async function directly", () => {
  function callback(info) {
      expect(info).toBe("success");
      // console.log("I'm callback function, I have performed")
  }
  fetchData(callback);
})

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

test("judge resolve directly", () => {
  return expect(Asynchronous()).resolves.toBe("success")
})

test("judge reject directly", () => {
  return expect(AsynchronousFailed()).rejects.toBe("failed")
})

test("judge reject directly when use async", async () => {
  await expect(AsynchronousFailed()).rejects.toBe("failed")
})

test("judge reject directly when use async", async () => {
  await expect(AsynchronousFailed()).rejects.toBe("failed")
})