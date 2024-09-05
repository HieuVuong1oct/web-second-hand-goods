import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Box, Alert, Snackbar, Container, Typography, CircularProgress } from '@mui/material';

import { listPath, listStatus } from 'src/constant/constant';
import MessageDialog from 'src/layouts/user/home/contentProductDetail/messageDialog';
import {
  addComment,
  rejectRequest,
  approveRequest,
  getProductById,
  userBuyProduct,
} from 'src/api/product';

// import ActionButtons from 'src/sections/home/contentProductDetail/actionButton';

import CommentSection from 'src/layouts/user/home/contentProductDetail/commentSection';
import RegisterDialog from 'src/layouts/user/home/contentProductDetail/registerDialog';
import ConfirmOrderDialog from 'src/layouts/user/home/contentProductDetail/cancelOrder';
import UserRequestList from 'src/layouts/user/home/contentProductDetail/userRequestList';
import ComponentProductDetail from 'src/layouts/user/home/contentProductDetail/componentProductDetail';

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [product, setProduct] = useState(null);
  const [userBuy, setUserBuy] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { productId } = useParams();

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

  const handleAddComment = async (data) => {
    try {
      await addComment({ content: data, productId: product.productId });

      setSnackbarMessage('Thêm bình luận thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra . Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // const handleToggleNotifications = () => {
  //   setNotificationsEnabled(!notificationsEnabled);
  // };

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

  const handleProduct = () => {
    navigate(listPath.PRODUCT);
  };

  const imageArray = JSON.parse(product.images);
  const imageBig = imageArray[0];
  const smallImages = imageArray.slice(1, 4);

  return (
    <>
    <Typography sx={{ mb: 2 }} variant="h5">
        Chi tiết sản phẩm : {product.name}
      </Typography>
      <Typography sx={{ cursor: 'pointer', color: 'blue', mb: 2, mt: 2 }} onClick={handleProduct}>
        Tới trang quản lý sản phẩm
      </Typography>
      <Container
        width="80%"
        sx={{
          margin: '0 auto',
          paddingTop: '20px',
          backgroundColor: 'white',
          borderRadius: '10px',
        }}
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
          notificationsEnabled={notificationsEnabled}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleToggleNotifications={handleToggleNotifications}
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
    </>
  );
};

export default ProductDetail;
