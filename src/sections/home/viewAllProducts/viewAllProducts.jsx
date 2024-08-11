
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  Button,
  CardMedia,
  Pagination,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import { getCategoryById, getProductByCategoryId } from 'src/api/product'

import Header from 'src/sections/home/header';

import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';


const AllProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const {navigateProductById} = useNavigationHelpers
  const handleProductClick = (productId) => {
    navigateProductById(productId)
  };

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductByCategoryId(categoryId, page, itemsPerPage)
        
        setProducts(response.data.data);
        setTotalPages(response.data.meta.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategoryById(categoryId)
        setCategories(categoriesResponse.data);
      } catch (err) {
        alert('Lỗi');
      }
    };

    fetchProducts();
    fetchCategories();
  }, [categoryId, page]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <Box sx={{ width: '60%', margin: '0 auto', paddingTop: '170px', paddingBottom: '100px' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Tất cả sản phẩm: {categories.categoryName}
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Number(product.productId)}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(Number(product.productId))}
              >
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
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">${product.price}</Typography>
                  {product.priceSale && (
                    <Typography variant="body2" color="textSecondary">
                      ${product.priceSale}
                    </Typography>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button variant="contained" color="primary">
                      Mua ngay
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
            count={Math.max(totalPages, 1)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AllProductsPage;
