

import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const login = (data) => 
 axiosClient.post(listPathApi.urlLogin, data);


export const signUp = (data) => 
   axiosClient.post(listPathApi.urlSignUp, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


export const verifyEmail = (email) => 
   axiosClient.get(listPathApi.urlVerifyEmail(email));

export const resetToken = (data) => 
   axiosClient.get(listPathApi.urlRefreshToken, data);

export const sendOtp = (data) => 
   axiosClient.post(listPathApi.urlSendOtp, data);

export const setPassword = (email, otp, password) => 
   axiosClient.put(listPathApi.urlNewPassword, {
    email,
    otp,
    password
  });



export const logout = async () => {

  
     await axiosClient.post(listPathApi.urlLogout, {}, {
      withCredentials: true
     })
   
 };