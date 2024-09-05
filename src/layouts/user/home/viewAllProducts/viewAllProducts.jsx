import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

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

import { listPath, listStatus } from 'src/constant/constant';
import { getCategoryById, getProductByCategoryId } from 'src/api/product';

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
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const handleProductClick = (productId) => {
    navigate(listPath.listProductById(productId));
  };

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    if (categoryId === '1') {
      setStatus(listStatus.APPROVED);
    }
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await getProductByCategoryId(categoryId, page, itemsPerPage, status,'');
       
        const allProductApprove = response.data.filter(
          (product) => product.status === listStatus.APPROVED
        );
        
        setProducts(allProductApprove);
        setTotalPages(response.meta.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getCategoryById(categoryId);
        setCategories(categoriesResponse);
      } catch (err) {
        alert('Lỗi', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [categoryId, page, status]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        width: '80%',
        margin: '0 auto',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Tất cả sản phẩm: {categories.categoryName}
      </Typography>
      {products.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 3 }}>
          Hiện không có sản phẩm nào
        </Typography>
      ) : (
        <>
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
      {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Pagination
                count={Math.max(totalPages, 1)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
         )}
        </>
      )}
    </Box>
  );
};

export default AllProductsPage;
