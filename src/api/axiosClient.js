import axios from 'axios';
import Cookies from 'js-cookie';


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => new URLSearchParams(params).toString(),
  withCredentials: true
});

axiosClient.interceptors.request.use(

  async config => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Cookie = `accessToken=${accessToken}`;
    }
  
    return config;
  },
  error =>  Promise.reject(error)
  

);

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  }
);

export default axiosClient;
