import { listPathApi } from 'src/constant/constant';

import axiosClient from './axiosClient';

export const login = (data) => axiosClient.post(listPathApi.URL_LOGIN, data);

export const signUp = (data) =>
  axiosClient.post(listPathApi.URL_SIGN_UP, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const verifyEmail = (email) => axiosClient.get(listPathApi.URL_VERIFY_EMAIL(email));

export const resetToken = (data) => axiosClient.get(listPathApi.URL_REFRESH_TOKEN, data);

export const sendOtp = (data) => axiosClient.post(listPathApi.URL_SEND_OTP, data);

export const setPassword = (email, otp, password) =>
  axiosClient.put(listPathApi.URL_NEW_PASSWORD, {
    email,
    otp,
    password,
  });

export const logout = async () => {
  await axiosClient.post(
    listPathApi.URL_LOGOUT,
    {},
    {
      withCredentials: true,
    }
  );
};
