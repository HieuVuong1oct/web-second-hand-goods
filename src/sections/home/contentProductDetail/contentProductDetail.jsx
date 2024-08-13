import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { ThumbUp, ThumbDown, NotificationsOff, NotificationsActive } from '@mui/icons-material';
import {
  Card,
  Grid,
  Button,
  Dialog,
  CardMedia,
  Container,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { getProductById } from 'src/api/product';

const ProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        
        setProduct(response.data[0]);
      } catch (error) {
       
        alert('Lỗi');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterBuy = () => {
    handleClose();
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
    <Container width="80%" sx={{margin: '0 auto', paddingTop: '20px' ,  backgroundColor:'white' ,borderRadius:'10px'  }}  >
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="400" image={imageBig} alt={product.name} />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {smallImages.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100"
                      image={image}
                      alt={`Hình ảnh sản phẩm ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Tên sản phẩm: {product.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Giá: ${product.price}
          </Typography>
         
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Trạng thái: {getStatus(product.categoryId)}
          </Typography>

          {product.categoryId !== 2 && (
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2, ml: 2 }}>
              Đăng ký mua
            </Button>
          )}
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Đăng ký mua</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Lời nhắn"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Giá mong muốn"
            type="number"
            fullWidth
            variant="outlined"
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleRegisterBuy} color="primary">
            Đăng ký
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <IconButton aria-label="like" onClick={handleLike}>
            <ThumbUp />
          </IconButton>
          {likes}
          <IconButton aria-label="unlike" onClick={handleDislike}>
            <ThumbDown />
          </IconButton>
          {dislikes}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color={notificationsEnabled ? 'secondary' : 'primary'}
            onClick={handleToggleNotifications}
          >
            {notificationsEnabled ? <NotificationsOff /> : <NotificationsActive />}
            {notificationsEnabled ? 'Tắt thông báo' : 'Bật thông báo'}
          </Button>
        </Grid>
      </Grid>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Phản hồi
        </Typography>
        <TextField
          label="Nhập bình luận"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 2 }}>
          Thêm bình luận
        </Button>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ p: 2 }}>
                <Typography variant="body1">{comment}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default ProductDetail;
