import axios from 'axios';
import { getToDoList } from './functionModules';

jest.mock('axios');

test("pretend to call axios api", async () => {
  let myResult = { data: [{id: 1, title: "get up early", complete: false}] };
  axios.get.mockResolvedValue(myResult);
  //axios.get.mockImplementation(() => Promise.resolve(myResult))
  return getToDoList(() => {}).then(data => expect(data).toEqual(myResult));
})