import axiosClient from './axiosClient';

export const addProduct = (data) => {
    const url = '/product/add-product';
    return axiosClient.post(url, data);
  };