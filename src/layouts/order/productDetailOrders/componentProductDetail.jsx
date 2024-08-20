import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Card,  CardMedia, Typography } from '@mui/material';

const ComponentProductDetail = ({ imageBig, smallImages, product,  }) => (
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
        Mô tả: {product.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Trạng thái: Đang chờ duyệt
      </Typography>

    </Grid>
  </Grid>
);

ComponentProductDetail.propTypes = {
  imageBig: PropTypes.string.isRequired,
  smallImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
  }).isRequired,
 

};
export default ComponentProductDetail;
