import { listPathApi } from 'src/constant/constant';

import axiosClient from './axiosClient';

export const getUsers = async (page, itemsPerPage, name, role) => {
  const response = await axiosClient.get(listPathApi.URL_GET_ALL_USER, {
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
  const response = await axiosClient.get(listPathApi.URL_GET_USER_BY_ID(userId));
  return response;
};
export const addUser = (data) =>
  axiosClient.post(listPathApi.URL_ADD_USER, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateUser = (userId, user) => {
  const response = axiosClient.put(listPathApi.URL_UPDATE_USER(userId), user, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const deleteUser = (userId) => axiosClient.delete(listPathApi.URL_DELETE_USER(userId));

export const getAllNotification = async (page) => {
  const response = await axiosClient.get(listPathApi.URL_ALL_NOTIFICATION, {
    params: {
      page,
    },
  });
  return response;
};

export const getNotification = async (notificationId) => {
  const response = await axiosClient.get(listPathApi.URL_NOTIFICATION(notificationId));
  return response;
};

export const getTag = async (userId) => {
  const response = await axiosClient.get(listPathApi.URL_TAG, { userId });

  return response;
};
