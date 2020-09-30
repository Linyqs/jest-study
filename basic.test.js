import { sum, returnObj, throwError } from './functionModules';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('compare object', () => {
    let result = returnObj(10);
    expect(result).toEqual({name: "小哈", age: 11 });
    expect(result).not.toBe({name: "小哈", age: 11 });
});

test('sth special in need', () => {
    let data1 = null, data2, data3 = 0.1 + 0.2;
    expect(data1).toBeNull;
    expect(data2).toBeDefined;
    expect(data3).toBeCloseTo(0.3);
    expect(1 === 1).toBeTruthy();
    expect(0 === 1).toBeFalsy();
})

test('test error funciton', () => {
    expect(throwError).toThrow(Error);
})