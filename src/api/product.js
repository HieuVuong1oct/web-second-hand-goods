import Cookies from 'js-cookie';

import { listPathApi } from 'src/constant/constant';

import axiosClient from './axiosClient';

const accessToken = Cookies.get('accessToken');

export const addProduct = (data) => {
  const response = axiosClient.post(listPathApi.urlAddProduct, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getAllProduct = async () => {
  const response = await axiosClient.get(listPathApi.urlGetAllProduct);
  return response;
};

export const getProductById = async (id) => {
  const response = await axiosClient.get(listPathApi.urlGetProductById(id));
  return response;
};
