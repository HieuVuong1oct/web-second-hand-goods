import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Alert, Snackbar, Container, Typography } from '@mui/material';

import { rejectRequest, approveRequest, getProductById, userBuyProduct } from 'src/api/product';

import ActionButtons from './actionButton';
import MessageDialog from './messageDialog';
import CommentSection from './commentSection';
import RegisterDialog from './registerDialog';
import UserRequestList from './userRequestList';
import ComponentProductDetail from './componentProductDetail';

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState();
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [product, setProduct] = useState(null);
  const [userBuy, setUserBuy] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const { productId } = useParams();

  const fetchProduct = useCallback(async () => {
    try {
      const response = await getProductById(productId);
      const fetchedProduct = response.data[0];
      setProduct(fetchedProduct);
      const resUserBuy = Array.isArray(fetchedProduct.requests) ? fetchedProduct.requests : [];

      const filterUserBuy = resUserBuy.filter((resUser) => resUser.requestStatus === 'PENDING');
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

  const handleRegisterBuy = async () => {
    setLoading(true);
    try {
      await userBuyProduct({
        productId: product.productId,
        message,
        offer,
      });

      setSnackbarMessage('Đăng ký mua thành công!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setMessage('');
      setOffer('');
      handleClose();
    } catch (error) {
      setSnackbarMessage('Có lỗi xảy ra khi đăng ký mua. Vui lòng thử lại.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
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
    return <Typography variant="h6">Loading...</Typography>;
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

      <ActionButtons
        likes={likes}
        dislikes={dislikes}
        notificationsEnabled={notificationsEnabled}
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleToggleNotifications={handleToggleNotifications}
      />

      {userBuy.length > 0 && (
        <UserRequestList
          userBuy={userBuy}
          handleViewMessage={handleViewMessage}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
        />
      )}

      <CommentSection
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        comments={comments}
      />

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
