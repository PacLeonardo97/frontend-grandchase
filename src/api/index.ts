import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_BASEURL_BACKEND,
});

export default api;
