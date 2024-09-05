import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const getAllCategory = async () => {
  const response = await axiosClient.get(listPathApi. URL_GET_ALL_CATEGORY);
  return response;
};

export const addCategory = (data) => 
  axiosClient.post(listPathApi.URL_ADD_CATEGORY, data);

