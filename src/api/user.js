import axiosClient from './axiosClient';

export const getUsers = async () => {
  const url = '/user/get-all';

  const response = await axiosClient.get(url);
  return response;
};
