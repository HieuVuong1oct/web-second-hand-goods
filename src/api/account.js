import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const login = (data) => 
 axiosClient.post(listPathApi.urlLogin, data);


export const signup = (data) => 
  axiosClient.post(listPathApi.urlSignUp, data);


export const verifyEmail = (email) => 
   axiosClient.get(listPathApi.urlVerifyEmail(email));


export const resetToken = (data) => 
   axiosClient.post(listPathApi.urlRefreshToken, data);

