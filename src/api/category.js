import { listPath } from 'src/constant/constant'

import axiosClient from './axiosClient';

export const getAllCategory = async () => {
  const response = await axiosClient.get(listPath.urlGetAllCategory);
  return response;
};