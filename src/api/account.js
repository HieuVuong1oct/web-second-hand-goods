import axiosClient from './axiosClient'; 


export const login = (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  };

  

  export const signup = (data) => {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  };

  export const sendResetPasswordEmail = (data) => {
    const url = '/auth/forgot-password';
    return axiosClient.post(url, data);
  };

  export const verifyEmail = (email) => {
    const url = `/auth/verify/${email}`;
    return axiosClient.get(url);
  };

  export const resetPassword = (data) => {
    const url = '/auth/refresh-token';
    return axiosClient.post(url, data);
  };