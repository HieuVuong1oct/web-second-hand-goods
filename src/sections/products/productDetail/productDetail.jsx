// ProductDetailView.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Grid, Card, Container, CardMedia, Typography } from '@mui/material';

const ProductDetailView = () => {
  const location = useLocation();
  const { state } = location;
  const product = state?.product;

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const images = Array.isArray(product.images) ? product.images : [];

  return (
    <Container>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.cover}
              alt={product.name}
            />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {images.slice(1).map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100"
                      image={image}
                      alt={`Product image ${index + 2}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Seller: {product.seller}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailView;
