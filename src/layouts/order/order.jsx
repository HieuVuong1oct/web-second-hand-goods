import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  TableContainer,
} from '@mui/material';

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
  const itemsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page'), 10) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getApprovedProducts(categoryId, page, itemsPerPage);

        const products = Array.isArray(response.data) ? response.data : [];
        const approvedProducts = products.filter((product) => product.status === 'PENDING');

        setOrders(approvedProducts);
        setTotalPages(response.meta.total);
      } catch (error) {
        alert('Lỗi', error);
      }
    };

    fetchInitialData();
  }, [page, itemsPerPage]);
  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };
  const approve = async () => {
    try {
      await approveProduct(productIdToApprove);
      handleCloseConfirmDialog();
      const response = await getApprovedProducts(categoryId, page, itemsPerPage);
      const products = Array.isArray(response.data) ? response.data : [];
      const approvedProducts = products.filter((product) => product.status === 'PENDING');
      setOrders(approvedProducts);
    } catch (error) {
      alert('Lỗi', error);
    }
  };

  const reject = async () => {
    if (!rejectProductId || !rejectReason) {
      alert('Vui lòng nhập lý do từ chối.');
      return;
    }

    try {
      await rejectProduct(rejectProductId, rejectReason);
      handleCloseRejectDialog();
      const response = await getApprovedProducts(categoryId, page, itemsPerPage);

      const products = Array.isArray(response.data) ? response.data : [];
      const approvedProducts = products.filter((product) => product.status === 'PENDING');
      setOrders(approvedProducts);
    } catch (error) {
      alert('Lỗi', error);
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Hành động</TableCell>
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
        <Pagination
          count={Math.max(totalPages, 1)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default OrderManagement;
