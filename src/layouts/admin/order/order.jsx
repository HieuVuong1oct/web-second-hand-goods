import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Table,
  Paper,
  Alert,
  Button,
  Snackbar,
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
  const categoryId = 1;
  const itemsPerPage = 4;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productIdToApprove, setProductIdToApprove] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectProductId, setRejectProductId] = useState(null);

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const navigate = useNavigate();

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getApprovedProducts(categoryId, page, itemsPerPage, 'PENDING', name);
      const products = Array.isArray(response.data) ? response.data : [];
      setOrders(products);
      setTotalPages(response.meta.total);
    } catch (err) {
      alert('Lỗi', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, itemsPerPage, name]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };
  const approve = async () => {
    setLoading(true);
    try {
      const response = await approveProduct(productIdToApprove);
      if (response) {
        setSearchParams({ page: 1 });
      }
      setSuccess(true);
      handleCloseConfirmDialog();
      await fetchInitialData();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    setLoading(true);
    try {
      const response = await rejectProduct(rejectProductId, rejectReason);
      if (response) {
        setSearchParams({ page: 1 });
      }
      setSuccess(true);

      handleCloseRejectDialog();
      await fetchInitialData();
    } catch (err) {
      setError(err);
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
    navigate(listPath.PRODUCT_DETAIL_ORDER(productId));
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

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Thành công!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderManagement;
