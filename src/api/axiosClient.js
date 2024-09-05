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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const token = response.data;

      Cookies.set('accessToken', token.data.accessToken);
      Cookies.set('refreshToken', token.data.refreshToken);

      return {
        accessToken: token.data.accessToken,
        refreshToken: token.data.refreshToken,
      };
    }
  } catch (error) {
    alert('Lỗi xảy ra');
  }
  return null;
};

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const tokens = await refreshAccessToken();
      if (tokens && tokens.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    // Nếu có dữ liệu trong response, trả về luôn response.data
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = await refreshAccessToken();
      if (tokens && tokens.accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
        return axiosClient(originalRequest);
      }
    }

    return Promise.reject(error.response?.data || { message: error.message });
  }
);

const startTokenRefreshInterval = () => {
  setInterval(
    async () => {
      await refreshAccessToken();
    },
    14 * 60 * 1000
  );
};

startTokenRefreshInterval();

export default axiosClient;
