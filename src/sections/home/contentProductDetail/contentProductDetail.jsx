import { useParams } from 'react-router-dom';
import React, {  useState ,useEffect,} from 'react';

import { Grid, Card, Button, Container, CardMedia, Typography,CircularProgress } from '@mui/material';

import { getProductById } from 'src/api/product';



const ContentProductDetailView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!product) {
    return <CircularProgress />;
  }
  const images = Array.isArray(product.images) ? product.images : [];
  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="400" image={product.cover} alt={product.name} />
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
            Tên sản phẩm :{product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Giá : ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Thông tin :{product.description}
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
