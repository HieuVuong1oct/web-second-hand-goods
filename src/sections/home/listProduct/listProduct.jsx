import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Grid, Card, Button, Container, Pagination, Typography, CardContent } from '@mui/material';

import { listPath } from 'src/routes/constant';

import { getAllProduct } from 'src/api/product';

import useStyles from './listProductStyles';

export default function AllProductsView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`${listPath.contentProductDetail}/${product.productId}`);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tất Cả Sản Phẩm
      </Typography>

      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.productId}>
            <Card className={classes.productCard} onClick={() => handleCardClick(product)}>
              <CardContent className={classes.cardContent}>
                <img src={product.cover} alt={product.name} className={classes.productImage} />
                <div className={classes.productInfo}>
                  <Typography variant="h6" className={classes.productName}>{product.name}</Typography>
                  <Typography variant="body2">${product.price}</Typography>
                </div>
                <Button variant="contained" color="primary" className={classes.buyNowButton}>
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 3 }}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}
