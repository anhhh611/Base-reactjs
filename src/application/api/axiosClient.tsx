import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://test-heroku444.herokuapp.com',
  headers: {
    'content-type': 'application/json',
  },
});
