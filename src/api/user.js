import axiosClient from './axiosClient';

export const getUsers = async () => {
  const url = '/user/get-all';
  return  axiosClient.get(url);
};