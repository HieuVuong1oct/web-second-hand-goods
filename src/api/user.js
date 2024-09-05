import { listPathApi } from 'src/constant/constant';

import axiosClient from './axiosClient';

export const getUsers = async (page, itemsPerPage, name, role) => {
  const response = await axiosClient.get(listPathApi.urlGetAllUser, {
    params: {
      page,
      limit: itemsPerPage,
      name,
      role,
    },
  });
  return response;
};

export const getUserById = async (userId) => {
  const response = await axiosClient.get(listPathApi.urlGetUserById(userId));
  return response;
};
export const addUser = (data) =>
  axiosClient.post(listPathApi.urlAddUser, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateUser = (userId, user) => {
  const response = axiosClient.put(listPathApi.urlUpdateUser(userId), user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const deleteUser = (userId) => axiosClient.delete(listPathApi.urlDeleteUser(userId));

export const getAllNotification = async (page) => {
  const response = await axiosClient.get(listPathApi.urlAllNotification,{
    params:{
      page
    }
  });
  return response;
};

export const getNotification = async (notificationId) => {
  const response = await axiosClient.get(listPathApi.urlNotification(notificationId));
  return response;
};
