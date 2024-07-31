import { listPath } from 'src/constant/constant'

import axiosClient from './axiosClient';

export const login = (data) => 
 axiosClient.post(listPath.urlLogin, data);


export const signup = (data) => 
  axiosClient.post(listPath.urlSignUp, data);


export const verifyEmail = (email) => 
   axiosClient.get(listPath.urlVerifyEmail(email));


export const resetToken = (data) => 
   axiosClient.post(listPath.urlRefreshToken, data);

