import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => new URLSearchParams(params).toString(),
  withCredentials: true // Thiết lập để gửi kèm cookies
});

console.log('API Base URL:', import.meta.env.VITE_API_URL);

axiosClient.interceptors.request.use(
  async config => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Cookie = `accessToken=${accessToken}`;
    }
    console.log('Sending request to:', config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  response => {
    console.log('Received response:', response);
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    console.error('Response error:', error);
    throw error;
  }
);

export default axiosClient;
