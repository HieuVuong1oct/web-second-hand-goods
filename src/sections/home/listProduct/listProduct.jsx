<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Grid, Card, Button, Container, Pagination, Typography, CardContent } from '@mui/material';

import { listPath } from 'src/routes/constant';
=======
import PropTypes from 'prop-types';
import { useNavigate, } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Grid, Card, Button, Container, Pagination, Typography, CardContent } from '@mui/material';
>>>>>>> e31dc086f120d2481c0b8d0648f23d524f8f38e9

import { getAllProduct } from 'src/api/product';
import { listPath } from 'src/constant/constant';

import useStyles from './listProductStyles';

export default function AllProductsView({ categoryId }) {
  const classes = useStyles();
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts =async () => {
      try {
        const response = await getAllProduct();
        const allProducts = response.data;
        const filtered = categoryId ? allProducts.filter(product => product.categoryId === categoryId) : allProducts
      
        setFilteredProducts(filtered)
        setTotalPages(Math.ceil(filtered.length/productsPerPage))
      } catch(error){
        alert(`Error:${error.message}`)
      }
    }
    fetchProducts()
  },[categoryId])

  const handleCardClick = (product) => {
    navigate(`${listPath.contentProductDetail}/${product.categoryId}`);
>>>>>>> e31dc086f120d2481c0b8d0648f23d524f8f38e9
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

<<<<<<< HEAD
  const paginatedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);
=======
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);
>>>>>>> e31dc086f120d2481c0b8d0648f23d524f8f38e9

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
<<<<<<< HEAD
=======
AllProductsView.propTypes = {
  categoryId: PropTypes.number, 
};
>>>>>>> e31dc086f120d2481c0b8d0648f23d524f8f38e9
