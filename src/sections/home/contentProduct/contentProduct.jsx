import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect,  } from 'react';

import { Box, Card, Button, Divider, Typography, CardContent } from '@mui/material';

import { getAllProduct } from 'src/api/product';
import { listPath } from 'src/constant/constant'
import { getAllCategory } from 'src/api/category';

import useStyles from './contentProductStyles';
import { ProductCategory } from '../productCategory';
import AllProductsView from '../listProduct/listProduct';

export default function ContentProductView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAllProduct(),
          getAllCategory(),
        ]);
     
        setProducts(productsResponse.data);
        setCategories(categoriesResponse);
        
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleCardClick = (product) => {
    navigate(listPath.contentProductDetail, { state: { product } });
  };

  const handleViewAllClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowAllProducts(true);
  };

  const featuredProduct = {
    cover: '/favicon/ip15.jpg',
    name: 'Iphone 15',
    describe: 'Apple đã cho ra mắt iPhone 15 Pro Max thuộc dòng iPhone 15 Series trong sự kiện "Wonderlust" cùng Apple Watch Series 9 và Apple Watch Ultra 2. Đây là phiên bản iPhone cao cấp nhất của iPhone 15 Series với nhiều những cải tiến vượt bật cả về thiết kế và hiệu năng.',
    price: 1000,
    seller: 'Người bán ABC',
    purchases: 150,
  };

  const getProductsByCategory = (categoryId) =>
    products.filter(product => product.categoryId === categoryId).slice(0, 4);

  return (
    <>
    {!showAllProducts ? (
      <>
        <h1 style={{ fontSize: '24px' }}>Sản Phẩm Nổi Bật</h1>
        <Card className={classes.featuredProductCard} sx={{ backgroundColor: '#fce4ec' }}>
          <CardContent className={classes.featuredCardContent}>
            <img src={featuredProduct.cover} alt={featuredProduct.name} className={classes.featuredProductImage} />
            <Box className={classes.featuredProductInfo}>
              <Typography variant="h5">{featuredProduct.name}</Typography>
              <Typography variant="body1">{featuredProduct.describe}</Typography>
              <Typography variant="body1">Giá: ${featuredProduct.price}</Typography>
              <Typography variant="body1">Người bán: {featuredProduct.seller}</Typography>
              <Typography variant="body1">Số lượt mua: {featuredProduct.purchases}</Typography>
              <Button variant="contained" color="primary" className={classes.buyNowButton}>Mua ngay</Button>
            </Box>
          </CardContent>
        </Card>
  
        <Divider />
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <ProductCategory
              key={category.categoryId}
              categoryTitle={category.categoryName}
              categoryId={category.categoryId}
              displayedProducts={getProductsByCategory(category.categoryId)}
              handleCardClick={handleCardClick}
              handleViewAllClick={handleViewAllClick}
              classes={classes}
            />
          ))
        ) : (
          <Typography>Không có sản phẩm</Typography>
        )}
      </>
    ) : (
      <AllProductsView categoryId={selectedCategoryId} />
    )}
  </>
  );
}