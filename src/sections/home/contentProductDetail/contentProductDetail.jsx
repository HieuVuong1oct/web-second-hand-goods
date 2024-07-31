
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Grid, Card, Button, Container, CardMedia, Typography,CircularProgress } from '@mui/material';

const ContentProductDetailView = () => {
  const { state } = useLocation();
  const product = state?.product;
  const error = state?.error;

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!product) {
    return <CircularProgress />;
  }

  const smallImages = Array(3).fill(product.cover);

  return (
    <Container width="100%" sx={{ mt: 1 }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
      
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.cover}
              alt={product.name}
            />
            
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {smallImages.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="100"
                      image={image}
                      alt={`Product image ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        
        {/* Phần thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Tên sản phẩm: {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Giá: ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Thông tin: {product.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Trạng thái: {product.status}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            ID danh mục: {product.categoryId}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Mua ngay
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentProductDetailView;
