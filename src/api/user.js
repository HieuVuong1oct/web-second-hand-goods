import { listPath } from 'src/constant/constant'

import axiosClient from './axiosClient';

export const getUsers = async () => {
  const response = await axiosClient.get(listPath.urlGetAllUser);
  return response;
};
