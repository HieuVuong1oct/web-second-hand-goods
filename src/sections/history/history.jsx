import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

import {
  Box,
  Tab,
  Tabs,
 
  Table,
  Paper,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  DialogContentText,

} from '@mui/material';

import { getProducts } from 'src/api/product'
import { listPath } from 'src/constant/constant'


const TabPanel = ({ children, value, index, ...other }) => 
   (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );


const HistoryScreen = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [productsSelling, setProductsSelling] = useState([]);
  const [productsSold, setProductsSold] = useState([]);
  const [productsPending, setProductsPending] = useState([]);
  const [productsReject, setProductsReject] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const navigate = useNavigate();
  const sellingId = 1;
  const soldId = 2;

  useEffect(() => {
    const fetchDataSelling = async () => {
      try {
        const Products = await getProducts(sellingId);

        const productSelling = Products.filter(product => product.status === 'approve');
        setProductsSelling(productSelling);
        const productPending = Products.filter(product => product.status === 'pending');
        setProductsPending(productPending);
        const productReject = Products.filter(product => product.status === 'reject');
        setProductsReject(productReject);
      } catch (error) {
       
        alert('Lỗi');
      }
    };

    const fetchDataSold = async () => {
      try {
        const Products = await getProducts(soldId);
        setProductsSold(Products);
      } catch (error) {
        alert('Lỗi');
      }
    };

    fetchDataSelling();
    fetchDataSold();
  }, []);

  const handleOpenRejectDialog = (rejectMess) => {
    setRejectReason(rejectMess);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
  };

  const handleViewDetail = (productId) => {
    navigate(listPath.listProductById(productId));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box width="80%" sx={{ backgroundColor: '#ADD8E6', padding: '0 20px 20px 20px', borderRadius: '10px' }} height="100vh">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Đang bán" />
          <Tab label="Chờ duyệt" />
          <Tab label="Admin từ chối" />
          <Tab label="Đã bán" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <h2>Sản phẩm đang bán</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsSelling.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(product.id)}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <h2>Sản phẩm đã gửi cho admin duyệt</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsPending.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {product.status === 'reject' ? (
                        <Typography
                          style={{ color: 'red', cursor: 'pointer' }}
                        >
                          {product.status}
                        </Typography>
                      ) : (
                        product.status
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <h2>Sản phẩm bị từ chối</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsReject.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {product.status === 'reject' ? (
                        <Typography
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleOpenRejectDialog(product.reject)}
                        >
                          {product.status}
                        </Typography>
                      ) : (
                        product.status
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <h2>Sản phẩm đã bán</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsSold.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(product.id)}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
export default HistoryScreen;