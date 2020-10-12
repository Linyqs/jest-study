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


