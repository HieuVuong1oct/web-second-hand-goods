import PropTypes from 'prop-types';
import React, { useState,useEffect } from 'react';
import { useNavigate , useSearchParams,} from 'react-router-dom';

import {
  Box,
  Tab,
  Tabs,
 Stack,
  Table,
  Paper,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Pagination,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  DialogContentText,

} from '@mui/material';

import { listPath } from 'src/constant/constant'
import { getProducts,getProductByCategoryId } from 'src/api/product'



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
  const [status,setStatus] = useState('approved')
  const navigate = useNavigate();
  const categoryId = 1;
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const itemsPerPage = 8;



  useEffect(() => {
    const fetchDataSelling = async () => {
      try {

        const response = await getProductByCategoryId(categoryId, page, itemsPerPage,status);
        
        setProducts(response.data);
      

      } catch (error) {
       
        alert('Lỗi');
      }
    };

    const fetchDataSold = async () => {
      try {
        const Products = await getProducts();
        const productSold = Products.filter(product => product.categoryId === 2);
        setProductsSold(productSold);
      } catch (error) {
        alert('Lỗi');
      }
    };

    fetchDataSelling();
    fetchDataSold();
  }, [page,status]);

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
  const handleViewDetail = (productId ) => {
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
      <Box width="80%" sx={{ backgroundColor: '#ADD8E6', padding: '0 20px 20px 20px', borderRadius: '10px' }} height="100vh">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Đang bán" onClick={() => handleTabClick(0, 'approved')} />
          <Tab label="Chờ duyệt" onClick={() => handleTabClick(1, 'pending')} />
          <Tab label="Admin từ chối" onClick={() => handleTabClick(2, 'rejected')} />
          <Tab label="Đã bán" onClick={() => handleTabClick(3, 'sold')} />
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
                {products.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(product.productId, product.status)}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
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
                  <TableCell>Lý do từ chối</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {product.status === 'REJECTED' ? (
                        <Typography
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleOpenRejectDialog(product.statusMessage)}
                        >
                          Xem lý do
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
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {productsSold.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(productsSold.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
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