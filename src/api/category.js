import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const getAllCategory = async () => {
  const response = await axiosClient.get(listPathApi.urlGetAllCategory);
  return response;
};