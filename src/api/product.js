import axiosClient from './axiosClient';

export const addProduct = (data) => {
    const url = '/product/add-product';
    return axiosClient.post(url, data);
  };

  export const getAllProduct = async () => {
    const url = '/product/get-all';
    const response = await axiosClient.get(url);
    return response;
  };

  export const getProductById = async (id) => {
    const url = `/product/get-by-id/${id}`;
    const response = await axiosClient.get(url);
    return response;
  };