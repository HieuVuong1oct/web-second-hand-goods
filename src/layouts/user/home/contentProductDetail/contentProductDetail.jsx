import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Box, Alert, Snackbar, Container, CircularProgress } from '@mui/material';

import { listStatus } from 'src/constant/constant';
import {
  addComment,
  rejectRequest,
  approveRequest,
  getProductById,
  userBuyProduct,
} from 'src/api/product';

import MessageDialog from './messageDialog';
import CommentSection from './commentSection';
import RegisterDialog from './registerDialog';
import ConfirmOrderDialog from './cancelOrder';
import UserRequestList from './userRequestList';
import ComponentProductDetail from './componentProductDetail';

const socket = io(import.meta.env.VITE_SOCKET_URL);
const ProductDetail = () => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState();

  const [product, setProduct] = useState(null);
  const [userBuy, setUserBuy] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { productId } = useParams();
  const Id = Cookies.get('userId');

  const fetchProduct = useCallback(async () => {
    try {
      const response = await getProductById(productId);

      const fetchedProduct = response.data[0];
      setProduct(fetchedProduct);

      const resUserBuy = Array.isArray(fetchedProduct.requests) ? fetchedProduct.requests : [];

      const filterUserBuy = resUserBuy.filter(
        (resUser) => resUser.requestStatus === listStatus.PENDING
      );
      setUserBuy(filterUserBuy);
    } catch (error) {
      setSnackbarMessage('Lỗi: ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [productId]);

  useEffect(() => {
    socket.emit('joinRoom', Number(productId), Id);

    return () => {
      socket.disconnect();
    };
  }, [productId, Id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterBuy = async (values) => {
    setLoading(true);
    try {
      await userBuyProduct({
        productId: product.productId,
        message: values.message,
        offer: values.offer,
      });

      setSnackbarMessage('Đăng ký mua thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setMessage('');
      setOffer();

      handleClose();
      fetchProduct();
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi đăng ký mua. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegister = async () => {
    setLoading(true);
    try {
      await userBuyProduct({
        productId: product.productId,
        message: 'Không mua',
        offer: 1,
      });

      setSnackbarMessage('Hủy đăng ký thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      fetchProduct();
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi hủy đăng ký. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setOpenConfirmDialog(false);
    }
  };

  const handleAddComment = async (data, userId) => {
    try {
      await addComment({ content: data, productId: product.productId }, userId);

      setSnackbarMessage('Thêm bình luận thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra . Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // const handleLike = () => {
  //   setLikes(likes + 1);
  // };

  // const handleDislike = () => {
  //   setDislikes(dislikes + 1);
  // };
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const handleViewMessage = (mess) => {
    setSelectedMessage(mess);
    setMessageDialogOpen(true);
  };

  const handleAcceptRequest = async (userId, username) => {
    try {
      await approveRequest(productId, userId);
      setSnackbarMessage(`Đã đồng ý bán cho: ${username}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchProduct();
    } catch (error) {
      setSnackbarMessage('Lỗi: ', error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleRejectRequest = async (userId, username) => {
    try {
      await rejectRequest(productId, userId);
      setSnackbarMessage(`Đã từ chối bán cho: ${username}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchProduct();
    } catch (error) {
      setSnackbarMessage('Lỗi: ', error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!product) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const getStatus = (categoryId) => {
    switch (categoryId) {
      case 1:
        return 'Đang bán';
      case 2:
        return 'Đã bán';
      default:
        return 'Không xác định';
    }
  };

  const imageArray = JSON.parse(product.images);
  const imageBig = imageArray[0];
  const smallImages = imageArray.slice(1, 4);

  return (
    <Container
      width="80%"
      sx={{ margin: '0 auto', paddingTop: '20px', backgroundColor: 'white', borderRadius: '10px' }}
    >
      <ComponentProductDetail
        imageBig={imageBig}
        smallImages={smallImages}
        product={product}
        getStatus={getStatus}
        handleOpen={handleOpen}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
      />

      <RegisterDialog
        open={open}
        handleClose={handleClose}
        message={message}
        setMessage={setMessage}
        offer={offer}
        setOffer={setOffer}
        handleRegisterBuy={handleRegisterBuy}
        loading={loading}
      />

      <MessageDialog
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        message={selectedMessage}
      />

      {/* <ActionButtons
        likes={likes}
        dislikes={dislikes}
        handleLike={handleLike}
        handleDislike={handleDislike}
      /> */}

      {userBuy.length > 0 && (
        <UserRequestList
          userBuy={userBuy}
          handleViewMessage={handleViewMessage}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />
      )}
      <ConfirmOrderDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleCancelRegister}
      />
      <CommentSection productId={productId} handleAddComment={handleAddComment} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
