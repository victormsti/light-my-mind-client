import Axios from 'axios';
import { getToken } from "./auth";

const api = Axios.create({baseURL : 'http://localhost:3010/api'});
api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  
export default api;