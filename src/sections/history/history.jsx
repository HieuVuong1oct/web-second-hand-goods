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

import { listPath } from 'src/constant/constant';
import { getProducts, getProductByCategoryId } from 'src/api/product';

import ProductsSold from './productsSold';
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

  const [tabValue, setTabValue] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState('approved');
  const navigate = useNavigate();
  const categoryId = 1;
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchDataSelling = async () => {
      try {
        const response = await getProductByCategoryId(categoryId, page, itemsPerPage, status);

        setProducts(response.data);
      } catch (error) {
        alert('Lỗi');
      }
    };

    const fetchDataSold = async () => {
      try {
        const Products = await getProducts();
        const productSold = Products.filter((product) => product.categoryId === 2);
        setProductsSold(productSold);
      } catch (error) {
        alert('Lỗi');
      }
    };

    fetchDataSelling();
    fetchDataSold();
  }, [page, status]);

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
  const handleTabClick = (index, statusValue) => {
    setTabValue(index);
    setStatus(statusValue);
    setSearchParams({ status: statusValue });
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
          <Tab label="Đang bán" onClick={() => handleTabClick(0, 'approved')} />
          <Tab label="Chờ duyệt" onClick={() => handleTabClick(1, 'pending')} />
          <Tab label="Admin từ chối" onClick={() => handleTabClick(2, 'rejected')} />
          <Tab label="Đã bán" onClick={() => handleTabClick(3, 'sold')} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <ProductsSelling
            products={products}
            page={page}
            itemsPerPage={itemsPerPage}
            handleViewDetail={handleViewDetail}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ProductsPendingApproval
            products={products}
            page={page}
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
            handleOpenRejectDialog={handleOpenRejectDialog}
            handlePageChange={handlePageChange}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <ProductsSold
            productsSold={productsSold}
            page={page}
            itemsPerPage={itemsPerPage}
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
