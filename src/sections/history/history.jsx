import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { getProducts } from 'src/api/product';
import { listPath, listStatus } from 'src/constant/constant';

import ProductsSave from './productSave';
import ProductsSold from './productsSold';
import ProductsRequest from './productRequest';
import ProductsSelling from './productsSelling';
import ProductsRejected from './productsRejected';
import ProductsPendingApproval from './productsPendingApproval';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const HistoryScreen = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [products, setProducts] = useState([]);
  const [productsSold, setProductsSold] = useState([]);
  const [productRequest, setProductRequest] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [total, setTotal] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [totalSave, setTotalSave] = useState();
  const [totalSold, setTotalSold] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status') || 'APPROVED';
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const itemsPerPage = 8;

  const requestStatus = searchParams.get('requestStatus') || 'APPROVED';
  useEffect(() => {
    const fetchDataSelling = async () => {
      try {
        const response = await getProducts(1, page, itemsPerPage, status, requestStatus);

        if (response) {
          const totalPage = response.userProduct.meta.total;
          setTotal(totalPage);
          const resProducts =
            response.userProduct?.data?.filter((product) => product.status === status) || [];
          const resProductRequest = response.requestedProduct?.data || [];

          const totalPageRequest = response.requestedProduct?.meta?.total;

          const totalPageSave = response.savedProduct?.meta.total;
          setTotalRequest(totalPageRequest);
          setTotalSave(totalPageSave);
          setProducts(resProducts);

          setProductRequest(resProductRequest);
        }
      } catch (error) {
        alert('Lỗi', error);
      }
    };

    const fetchDataSold = async () => {
      try {
        const Products = await getProducts(2, page, itemsPerPage);

        const productSold = Products.userProduct?.data.filter(
          (product) => product.categoryId === 2
        );
        setTotalSold(Products.userProduct?.meta?.total);
        setProductsSold(productSold);
      } catch (error) {
        alert('Lỗi', error);
      }
    };

    fetchDataSelling();
    fetchDataSold();
  }, [page, status, requestStatus]);

  const handleOpenRejectDialog = (rejectMess) => {
    setRejectReason(rejectMess);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
  };
  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };
  const handleViewDetail = (productId) => {
    navigate(listPath.listProductById(productId));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleTabClick = (index, statusValue, requestStatusValue = '') => {
    setTabValue(index);
    setSearchParams({ status: statusValue, requestStatus: requestStatusValue });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        width="80%"
        sx={{ backgroundColor: '#ADD8E6', padding: '0 20px 20px 20px', borderRadius: '10px' }}
        height="100vh"
      >
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Đang bán" onClick={() => handleTabClick(0, listStatus.APPROVED, '')} />
          <Tab label="Chờ duyệt" onClick={() => handleTabClick(1, listStatus.PENDING, '')} />
          <Tab label="Admin từ chối" onClick={() => handleTabClick(2, listStatus.REJECTED, '')} />
          <Tab label="Đã bán" onClick={() => handleTabClick(3, listStatus.SOLD, '')} />
          <Tab
            label="Đã đăng ký"
            onClick={() => handleTabClick(4, listStatus.APPROVED, listStatus.PENDING)}
          />
          <Tab
            label="Đã mua"
            onClick={() => handleTabClick(5, listStatus.APPROVED, listStatus.APPROVED)}
          />
          <Tab
            label="Người bán từ chối"
            onClick={() => handleTabClick(6, listStatus.APPROVED,listStatus.REJECTED)}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <ProductsSelling
            products={products}
            page={page}
            itemsPerPage={itemsPerPage}
            total={total}
            handleViewDetail={handleViewDetail}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ProductsPendingApproval
            products={products}
            page={page}
            total={total}
            itemsPerPage={itemsPerPage}
            handleOpenRejectDialog={handleOpenRejectDialog}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <ProductsRejected
            products={products}
            page={page}
            itemsPerPage={itemsPerPage}
            total={total}
            handleOpenRejectDialog={handleOpenRejectDialog}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <ProductsSold
            productsSold={productsSold}
            page={page}
            itemsPerPage={itemsPerPage}
            total={totalSold}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <ProductsRequest
            products={productRequest || []}
            page={page}
            itemsPerPage={itemsPerPage}
            total={totalRequest}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <ProductsSave
            products={productRequest || []}
            page={page}
            itemsPerPage={itemsPerPage}
            total={totalSave}
            handlePageChange={handlePageChange}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          <ProductsRequest
            products={productRequest || []}
            page={page}
            itemsPerPage={itemsPerPage}
            total={totalRequest}
            handlePageChange={handlePageChange}
          />
        </TabPanel>
        <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
          <DialogTitle>Lý do từ chối</DialogTitle>
          <DialogContent>
            <DialogContentText>{rejectReason}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRejectDialog} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default HistoryScreen;
