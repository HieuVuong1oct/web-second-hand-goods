import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => new URLSearchParams(params).toString(),
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { refreshToken });
      const newAccessToken = response.data.accessToken;
      Cookies.set('accessToken', newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    alert('Lỗi xảy ra')
  }
  return null;
};

axiosClient.interceptors.request.use(
  async (config) => {
    let accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      accessToken = await refreshAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const startTokenRefreshInterval = () => {
  setInterval(async () => {
    await refreshAccessToken();
  }, 15 * 60 * 1000); 
};

startTokenRefreshInterval();

export default axiosClient;
