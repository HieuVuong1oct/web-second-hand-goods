import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Card, Button, Divider, Typography, CardContent } from '@mui/material';

const ProductCategory = ({
  categoryTitle,
  categoryId,
  displayedProducts,
  handleCardClick,
  handleViewAllClick,
  classes,
}) => (
  <>
    <h1 style={{ fontSize: '24px' }}>{categoryTitle}</h1>
    <Grid container spacing={2} className={classes.productList}>
      {displayedProducts.map((product) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={product.productId}>
          <Card className={classes.productCard} onClick={() => handleCardClick(product)}>
            <CardContent className={classes.cardContent}>
              <img src={product.cover} alt={product.name} className={classes.productImage} />
              <div className={classes.productInfo}>
                <Typography variant="h6" className={classes.productName}>
                  {product.name}
                </Typography>
                <Typography variant="body2">${product.price}</Typography>
                {product.priceSale && (
                  <Typography variant="body2" color="textSecondary">
                    ${product.priceSale}
                  </Typography>
                )}
              </div>
              <Button variant="contained" color="primary" className={classes.buyNowButton}>
                Mua ngay
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}>
      <Typography
        variant="contained"
        color="secondary"
        onClick={() => handleViewAllClick(categoryId)}
        sx={{ cursor: 'pointer' }}
      >
        Xem Thêm
      </Typography>
    </Box>
    <Divider />
  </>
);

ProductCategory.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
  displayedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      priceSale: PropTypes.number,
    })
  ).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleViewAllClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default ProductCategory;
