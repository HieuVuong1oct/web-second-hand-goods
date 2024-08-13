import axios from 'axios';
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
  
  const response = await axiosClient.get(listPathApi.urlGetProductById(id),
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const getProductByCategoryId = async (categoryId, page, itemsPerPage) =>
   {
  try {
    
    const response = await axiosClient.get(listPathApi.urlGetProductByCategoryId, {
      params: {
        categoryId,
        page,
        limit: itemsPerPage,
      },
    });
   
    return response; 
  } catch (error) {
    alert('Lỗi')
    throw error;
  }
}

export const getCategoryById = async (id) => {
  const response = await axiosClient.get(listPathApi.urlGetCategoryById(id));
  return response;
};


// Gửi sản phẩm mới để phê duyệt
export const submitProductForApproval = async (productData) => {
  const categoryId = productData.get('categoryId'); 
  try {
  
    const response = await axios.post(`https://66b38d8a7fba54a5b7ed6258.mockapi.io/api/categories/${categoryId}/products`, {
      ...productData,
      status: 'pending', 
    });
    return response.data;
  } catch (error) {
   alert('Lỗi')
    throw error;
  }
};
export const getProducts = async () => {
      
  try {
    const response = await axiosClient.get(listPathApi.urlPersonalProduct);

    return response.data[0].userProduct;
  } catch (error) {
 
    alert('Lỗi')
    throw error;
  }
}

export const getApprovedProducts = async (categoryId,page,itemsPerPage) => {

  try {
    const response = await getProductByCategoryId(categoryId,page,itemsPerPage);
    
  
    return response;
  } catch (error) {
    alert('Lỗi')
    throw error;
  }
};
// Cập nhật trạng thái sản phẩm (đã duyệt)
export const approveProduct = async (productId) => {
  try {
    const response = await  axiosClient.put(listPathApi.urlApproveProduct(productId))
    return response.data;
  } catch (error) {
    alert('Lỗi')
    throw error;
  }
};


export const rejectProduct = async (productId,mess) => {
  try {
   
   const response = await  axiosClient.put(listPathApi.urlRejectProduct(productId), {
      
      message:mess,
    });
   
    return response.data;
  } catch (error) {
    alert('Lỗi')
    throw error;
  }
};
