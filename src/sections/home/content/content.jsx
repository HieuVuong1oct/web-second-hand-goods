import React, { useState, useEffect } from 'react';

import { Box, Card, Grid, Divider, CardMedia, Typography, CardContent ,CircularProgress} from '@mui/material';

import { getAllProduct } from 'src/api/product';
import { getAllCategory } from 'src/api/category';

import useStyles from './contentStyles';
import ProductList from '../productCategory/productCategory';

const featuredProduct = {
  cover: '/assets/images/products/product_1.jpg',
  name: 'Giày xanh',
  describe:
    'Giày nhiều người đăng kí nhất',
  price: 1000,
  seller: 'Nguyễn văn A',
  purchases: 150,
};

const ProductPage = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          getAllCategory(),
          getAllProduct(),
        ]);

        const productApprove = productsResponse.data.filter(
          (product) => product.status === 'APPROVED'
        );
       
        setCategories(categoriesResponse);

        setProducts(Array.isArray(productApprove) ? productApprove : []);
      } catch (error) {
        alert('Lỗi', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchInitialData();
  }, []);

  const groupedProducts = categories.map((category) => ({
    ...category,
    products: products
      .filter((product) => Number(category.categoryId) === Number(product.categoryId))
      .map((product) => ({
        ...product,
        productId: Number(product.productId),
      })),
  }));

  return (
    <Box
      sx={{
        width: '80%',
        margin: '0 auto',
        paddingTop: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Typography sx={{ marginBottom: 2, fontSize: '15px' }}>MOR MARKET</Typography>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Sản Phẩm Nổi Bật
            </Typography>
            <Card
              className={classes.featuredProductCard}
              sx={{ marginBottom: '16px', borderRadius: '10px', backgroundColor: '#f0f0f0' }}
            >
              <CardContent className={classes.featuredCardContent}>
                <CardMedia
                  component="img"
                  height="400"
                  image={featuredProduct.cover}
                  alt={featuredProduct.name}
                  className={classes.featuredProductImage}
                />
                <Box className={classes.featuredProductInfo}>
                  <Typography variant="h5">{featuredProduct.name}</Typography>
                  <Typography variant="body1">{featuredProduct.describe}</Typography>
                  <Typography variant="body1">Giá: ${featuredProduct.price}</Typography>
                  <Typography variant="body1">Người bán: {featuredProduct.seller}</Typography>
                  <Typography variant="body1">Số lượt mua: {featuredProduct.purchases}</Typography>
                </Box>
              </CardContent>
            </Card>
            <Divider sx={{ marginY: 2 }} />
          </div>
          {loading ? ( 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
          groupedProducts.map((category) => (
            <ProductList
              key={category.categoryId}
              category={category}
              products={category.products}
            />
          ))
        )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
