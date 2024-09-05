import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  Button,
  Divider,
  CardMedia,
  Typography,
  CardContent,
} from '@mui/material';

import { listPath } from 'src/constant/constant';

const ProductList = ({ category, products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(listPath.listProductById(productId));
  };

  const handleViewAllClick = (categoryId) => {
    navigate(listPath.productByCategoryId(categoryId));
  };

  const displayedProducts = products.slice(0, 8);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 2, cursor: 'pointer' }}
        onClick={() => handleViewAllClick(category.categoryId)}
      >
        {category.categoryName}
      </Typography>
      <Grid container spacing={2}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product.productId}>
            <Card
              onClick={() => handleProductClick(Number(product.productId))}
              sx={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
            >
              <CardContent>
                <CardMedia
                  component="img"
                  height="200"
                  image={JSON.parse(product.images)[0]}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                  variant="h6"
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                  variant="body2"
                >
                  ${product.price}
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                  variant="body2"
                >
                  Người bán: {product.author.username}
                </Typography>
                {category.categoryName !== 'Đã bán' && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }}>
                      Mua ngay
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewAllClick(category.categoryId)}
        >
          Xem thêm
        </Button>
      </Box>
      <Divider sx={{ marginY: 2 }} />
    </div>
  );
};

ProductList.propTypes = {
  category: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.string.isRequired,
      priceSale: PropTypes.number,
    })
  ).isRequired,
};

export default ProductList;
