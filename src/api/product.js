import axios from 'axios';
import Cookies from 'js-cookie';

import { listPathApi } from 'src/constant/constant';

import axiosClient from './axiosClient';

const accessToken = Cookies.get('accessToken');

export const addProduct = (data) => {
  const response = axiosClient.post(listPathApi.URL_ADD_PRODUCT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getAllProduct = async () => {
  const response = await axiosClient.get(listPathApi.URL_GET_ALL_PRODUCT);

  return response;
};

export const getProductById = async (id) => {
  const response = await axiosClient.get(listPathApi.URL_GET_PRODUCT_BY_ID(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const getProductByCategoryId = async (categoryId, page, itemsPerPage, status, name) => {
  const response = await axiosClient.get(listPathApi.URL_GET_PRODUCT_BY_CATEGORY_ID, {
    params: {
      categoryId,
      page,
      limit: itemsPerPage,
      status,
      productName: name,
    },
  });

  return response;
};

export const getCategoryById = async (id) => {
  const response = await axiosClient.get(listPathApi.URL_GET_CATEGORY_BY_ID(id));
  return response;
};

export const submitProductForApproval = async (productData) => {
  const categoryId = productData.get('categoryId');

  const response = await axios.post(
    `https://66b38d8a7fba54a5b7ed6258.mockapi.io/api/categories/${categoryId}/products`,
    {
      ...productData,
      status: 'pending',
    }
  );
  return response.data;
};
export const getProducts = async (categoryId, page, itemsPerPage, status, requestStatus) => {
  const response = await axiosClient.get(listPathApi.URL_PERSONAL_PRODUCT, {
    params: {
      categoryId,
      page,
      limit: itemsPerPage,
      status,
      requestStatus,
    },
  });

  return response.data[0];
};

export const getApprovedProducts = async (categoryId, page, itemsPerPage, status, name) => {
  const response = await getProductByCategoryId(categoryId, page, itemsPerPage, status, name);

  return response;
};

export const approveProduct = async (productId) => {
  const response = await axiosClient.put(listPathApi.URL_APPROVE_PRODUCT(productId));
  return response.data;
};

export const rejectProduct = async (productId, mess) => {
  const response = await axiosClient.put(listPathApi.URL_REJECT_PRODUCT(productId), {
    message: mess,
  });

  return response.data;
};

export const userBuyProduct = (data) => {
  const response = axiosClient.post(
    listPathApi.URL_USER_BUY(data.productId),
    {
      message: data.message,
      offer: data.offer,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

export const approveRequest = async (productId, userId) => {
  const response = await axiosClient.put(listPathApi.URL_APPROVE_REQUEST(productId, userId));
  return response;
};

export const rejectRequest = async (productId, userId) => {
  const response = await axiosClient.put(listPathApi.URL_REJECT_REQUEST(productId, userId));

  return response;
};

export const addComment = (data) => {
  const response = axiosClient.post(listPathApi.URL_ADD_COMMENT(data.productId), {
    content: data.content,
  });

  return response;
};

export const getTopProduct = async () => {
  const response = await axiosClient.get(listPathApi.URL_TOP_PRODUCT);
  return response;
};

export const getTrendProduct = async () => {
  const response = await axiosClient.get(listPathApi.URL_TREND_PRODUCT);

  return response;
};

export const deleteProduct = (productId) =>
  axiosClient.delete(listPathApi.URL_DELETE_PRODUCT(productId));

export const updateProduct = (productId, product) => {
  const response = axiosClient.put(listPathApi.URL_UPDATE_PRODUCT(productId), product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getListProduct = async (page, limit, name) => {
  const response = await axiosClient.get(listPathApi.URL_GET_LIST_PRODUCT, {
    params: {
      page,
      limit,
      productName: name,
    },
  });

  return response;
};

export const getComment = async (productId) => {
  const response = await axiosClient.get(listPathApi.URL_GET_COMMENT(productId));

  return response;
};