import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box, Card, CardMedia, Typography, CardContent, CircularProgress } from '@mui/material';

import { listPath } from 'src/constant/constant';

import useStyles from './contentStyles';

const FeaturedProduct = ({ product, loading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const featuredProduct = Array.isArray(product) ? product[0] : product;
  const images = product.images ? JSON.parse(product.images)[0] : null;

  const handleProductClick = (productId) => {
    navigate(listPath.listProductById(productId));
  };
  return (
    <Card className={classes.featuredProductCard}>
      <CardContent
        className={classes.featuredCardContent}
        onClick={() => handleProductClick(Number(featuredProduct.productId))}
        sx={{ cursor: 'pointer' }}
      >
        <CardMedia
          component="img"
          height="400"
          image={images}
          alt={featuredProduct.name}
          className={classes.featuredProductImage}
        />
        <Box className={classes.featuredProductInfo}>
          <Typography variant="h5">{featuredProduct.name} </Typography>
          <Typography variant="body1">Mô tả: {featuredProduct.description}</Typography>
          <Typography variant="body1">Giá: ${featuredProduct.price}</Typography>
          <Typography variant="body1">Người bán: {featuredProduct.author}</Typography>
          <Typography variant="body1">Số người đăng ký mua: {featuredProduct._count}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

FeaturedProduct.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.string,
    name: PropTypes.string,
    describe: PropTypes.string,
    price: PropTypes.number,
    author: PropTypes.string,
    _count: PropTypes.number,
  }),
  loading: PropTypes.bool.isRequired,
};
export default FeaturedProduct;
