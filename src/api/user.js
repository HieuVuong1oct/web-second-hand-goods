import axiosClient from './axiosClient';

export const getUsers = async () => {
  const url = '/user/get-all';
  try {
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};