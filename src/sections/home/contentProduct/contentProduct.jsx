import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect,  } from 'react';

import { Box, Card, Button, Divider, Typography, CardContent } from '@mui/material';

import { listPath } from 'src/routes/constant'

import { getAllProduct } from 'src/api/product';

import useStyles from './contentProductStyles';
import { ProductCategory } from '../productCategory';

export default function ContentProductView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([])


  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await getAllProduct()
        setProducts(response.data);
      }catch(error){
        alert(`Error: ${error.message}`);
      }
    }
    fetchProducts()
  },[])
  
  const handleCardClick = (product) => {
    navigate(listPath.contentProductDetail, { state: { product } });
  };

  const handleViewAllClick = () => {
    navigate(listPath.listProduct);
  };

  const featuredProduct = {
    cover: '/favicon/ip15.jpg',
    name: 'Iphone 15',
    describe:
      'Apple đã cho ra mắt iPhone 15 Pro Max thuộc dòng iPhone 15 Series trong sự kiện "Wonderlust" cùng Apple Watch Series 9 và Apple Watch Ultra 2. Đây là phiên bản iPhone cao cấp nhất của iPhone 15 Series với nhiều những cải tiến vượt bật cả về thiết kế và hiệu năng.',
    price: 1000,
    seller: 'Người bán ABC',
    purchases: 150,
  };

  const displayedProducts = products.slice(0, 4);
  return (
    <>
      <h1 style={{ fontSize: '24px' }}>Sản Phẩm Nổi Bật</h1>
      <Card className={classes.featuredProductCard} sx={{ backgroundColor: '#fce4ec' }}>
        <CardContent className={classes.featuredCardContent}>
          <img
            src={featuredProduct.cover}
            alt={featuredProduct.name}
            className={classes.featuredProductImage}
          />
          <Box className={classes.featuredProductInfo}>
            <Typography variant="h5">{featuredProduct.name}</Typography>
            <Typography variant="body1">{featuredProduct.describe}</Typography>
            <Typography variant="body1">Giá: ${featuredProduct.price}</Typography>
            <Typography variant="body1">Người bán: {featuredProduct.seller}</Typography>
            <Typography variant="body1">Số lượt mua: {featuredProduct.purchases}</Typography>
            <Button variant="contained" color="primary" className={classes.buyNowButton}>
              Mua ngay
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider />
      <ProductCategory
        categoryTitle="Đồ Thời Trang"
        displayedProducts={displayedProducts}
        handleCardClick={handleCardClick}
        handleViewAllClick={handleViewAllClick}
        classes={classes}
      />

      <ProductCategory
        categoryTitle="Đồ Thời Trang"
        displayedProducts={displayedProducts}
        handleCardClick={handleCardClick}
        handleViewAllClick={handleViewAllClick}
        classes={classes}
      />

<ProductCategory
        categoryTitle="Đồ Thời Trang"
        displayedProducts={displayedProducts}
        handleCardClick={handleCardClick}
        handleViewAllClick={handleViewAllClick}
        classes={classes}
      />
     
    </>
  );
}
