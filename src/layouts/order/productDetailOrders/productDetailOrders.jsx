import { useParams,useNavigate} from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Box, Alert, Snackbar, Container, Typography, CircularProgress } from '@mui/material';

// import { listPath } from 'src/constant/constant'
import { getProductById } from 'src/api/product';

import ComponentProductDetail from './componentProductDetail';


const ProductDetailOrders = () => {
  const [product, setProduct] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
const navigate = useNavigate()
  const { productId } = useParams();

  const fetchProduct = useCallback(async () => {
    try {
      const response = await getProductById(productId);
      const fetchedProduct = response.data[0];
  
      setProduct(fetchedProduct);
    } catch (error) {
      setSnackbarMessage('Lỗi: ');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

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

  const handleOrder = () => {
    navigate('/order')
  }

  const imageArray = JSON.parse(product.images);
  const imageBig = imageArray[0];
  const smallImages = imageArray.slice(1, 4);

  return (
    <>
    <Typography sx={{cursor:'pointer', color:'blue',}} onClick={handleOrder}>Tới trang duyệt</Typography>
    <Container
      width="80%"
      sx={{ margin: '0 auto', paddingTop: '20px', backgroundColor: 'white', borderRadius: '10px' }}
    >

      <ComponentProductDetail
        imageBig={imageBig}
        smallImages={smallImages}
        product={product}
   
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
    </>
  );
};

export default ProductDetailOrders;
