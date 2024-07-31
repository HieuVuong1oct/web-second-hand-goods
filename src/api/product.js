import { listPath } from 'src/constant/constant'

import axiosClient from './axiosClient';

export const addProduct = (data) => 
   axiosClient.post(listPath.urlAddProduct, data);
  

  export const getAllProduct = async () => {
    const response = await axiosClient.get(listPath.urlGetAllProduct);
    return response;
  };

  export const getProductById = async (id) => {
    const response = await axiosClient.get(listPath.urlGetProductById(id));
    return response;
  };

 