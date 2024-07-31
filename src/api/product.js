import { listPathApi } from 'src/constant/constant'

import axiosClient from './axiosClient';


export const addProduct = (data) => 
   axiosClient.post(listPathApi.urlAddProduct, data);
  

  export const getAllProduct = async () => {
    const response = await axiosClient.get(listPathApi.urlGetAllProduct);
    return response;
  };

  export const getProductById = async (id) => {
    const response = await axiosClient.get(listPathApi.urlGetProductById(id));
    return response;
  };

 