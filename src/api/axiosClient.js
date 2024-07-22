import axios from 'axios';


const axiosClient = axios.create({
  
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },

  paramsSerializer: params => new URLSearchParams(params).toString(),
});

axiosClient.interceptors.request.use(
  async config => config,
  error => Promise.reject(error)
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