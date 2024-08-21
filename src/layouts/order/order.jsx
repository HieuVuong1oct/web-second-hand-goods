import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  Typography,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { listPath } from 'src/constant/constant';
import { rejectProduct, approveProduct, getApprovedProducts } from 'src/api/product';

import RejectDialog from './rejectDialog';
import ConfirmDialog from './confirmDialog';

const OrderManagement = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [productIdToApprove, setProductIdToApprove] = useState(null);
  const [rejectProductId, setRejectProductId] = useState(null);
  const categoryId = 1;
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getApprovedProducts(categoryId, page, itemsPerPage, 'PENDING');
      const products = Array.isArray(response.data) ? response.data : [];
      setOrders(products);
      setTotalPages(response.meta.total);
    } catch (error) {
      alert('Lỗi', error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, itemsPerPage]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };
  const approve = async () => {
    setLoading(true);
    try {
      await approveProduct(productIdToApprove);
      handleCloseConfirmDialog();
      await fetchInitialData();
    } catch (error) {
      alert('Lỗi', error);
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    setLoading(true);
    try {
      await rejectProduct(rejectProductId, rejectReason);
      handleCloseRejectDialog();
      await fetchInitialData();
    } catch (error) {
      alert('Lỗi', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRejectDialog = (order) => {
    setSelectedOrder(order);
    setRejectProductId(order.productId);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setRejectReason('');
    setRejectProductId(null);
  };

  const handleOpenConfirmDialog = (productId) => {
    setProductIdToApprove(productId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setProductIdToApprove(null);
  };
  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography variant="h6" align="center">
        Không có sản phẩm cần duyệt
      </Typography>
    );
  }

  const handleViewDetail = (productId) => {
    navigate(listPath.productDetailOrders(productId));
  };
  return (
    <>
      <h2>Sản phẩm đang chờ duyệt</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.productId}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.author.username}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenConfirmDialog(order.productId)}
                  >
                    Đồng ý
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: 8 }}
                    onClick={() => handleOpenRejectDialog(order)}
                  >
                    Từ chối
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetail(order.productId)}
                  >
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ConfirmDialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={approve}
        />

        <RejectDialog
          open={openRejectDialog}
          onClose={handleCloseRejectDialog}
          onReject={reject}
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
          selectedOrder={selectedOrder}
        />
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default OrderManagement;
