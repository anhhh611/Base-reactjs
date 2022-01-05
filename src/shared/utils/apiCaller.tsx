import axios, { Method } from 'axios';
import * as Config from '../constant/Config';

export const callAPI = async (endpoint: string, method: Method, body: null) => {
  return await axios({
    method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log('err', err);
  });
};
