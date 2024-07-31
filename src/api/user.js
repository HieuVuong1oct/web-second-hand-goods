import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const getUsers = async () => {
  const response = await axiosClient.get(listPathApi.urlGetAllUser);
  return response;
};
