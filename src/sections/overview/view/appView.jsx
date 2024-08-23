import React, {useState, useEffect} from 'react'

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import { getTopProduct } from 'src/api/product'
import { MESSAGES } from 'src/constant/constant'

import AppConversionRates from '../appConversionRates'


export default function AppView() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getTopProduct();
        setProducts(response.data);
      } catch (err) {
        setErrorMessage(MESSAGES.ERROR_TOP_PRODUCT); 
        setOpen(true); 
      }
    };
    fetch();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const topProduct = products.map((product) => ({
    label: product.label,
    value: product.value,
  }));

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Chào mừng trở lại 👋
      </Typography>

      <Grid xs={12} md={6} lg={8}>
        <AppConversionRates
          title="Top 3 sản phẩm nhiều người đăng ký nhất"
          chart={{
            series: topProduct,
          }}
        />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}