import Cookies from 'js-cookie'
import React, { useState,useEffect } from 'react';

import {
  Table,
  Paper,
  Dialog,
  Button,
  TableRow,
  TableBody,
  TextField,
  TableCell,
  TableHead,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  DialogContentText,
} from '@mui/material';

import { rejectProduct,approveProduct, getApprovedProducts,  } from 'src/api/product';

const OrderManagement = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State cho dialog xác nhận
  const [rejectReason, setRejectReason] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [productIdToApprove, setProductIdToApprove] = useState(null); // State để lưu productId cần phê duyệt
  const [rejectProductId, setRejectProductId] = useState(null); // State để lưu productId cần từ chối
  const categoryId = 1;

  const username = Cookies.get('username');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const approvedProducts = await getApprovedProducts(categoryId);
        setOrders(approvedProducts);
      } catch (error) {
        alert('Lỗi');
      }
    };

    fetchInitialData();
  }, []);

  const approve = async () => {
    try {
      await approveProduct(productIdToApprove);
      handleCloseConfirmDialog(); 
      setOrders(await getApprovedProducts(categoryId)); 
    } catch (error) {
      alert('Lỗi');
    }
  };

  const reject = async () => {
    if (!rejectProductId || !rejectReason) {
      alert('Vui lòng nhập lý do từ chối.');
      return;
    }

    try {
      await rejectProduct(rejectProductId, rejectReason); // Gọi API từ chối với lý do
      handleCloseRejectDialog(); 
      setOrders(await getApprovedProducts(categoryId)); 
    } catch (error) {
      alert('Lỗi');
    }
  };

  const handleOpenRejectDialog = (order) => {
    setSelectedOrder(order);
    setRejectProductId(order.productId); // Lưu productId để từ chối
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setRejectReason('');
    setRejectProductId(null); // Reset productId khi đóng dialog
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
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{username}</TableCell>
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

      {/* Dialog xác nhận */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn cho phép đăng bán sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={approve} color="secondary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog từ chối */}
      <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
        <DialogTitle>Lý do từ chối</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập lý do từ chối đơn hàng của {selectedOrder?.username}:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Lý do"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={reject} color="secondary">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default OrderManagement;