import axiosClient from './axiosClient'; 


export const login = (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  };

  

  export const signup = (data) => {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  };