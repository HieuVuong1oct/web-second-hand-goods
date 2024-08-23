import React, { useState, useEffect } from 'react';

import { Box, Grid, Divider,  Typography,  CircularProgress} from '@mui/material';

import { getAllCategory } from 'src/api/category';
import { getAllProduct,getTrendProduct } from 'src/api/product';

import FeaturedProduct from './topProduct';
import ProductList from '../productCategory/productCategory';


const ProductPage = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true); 
  const [topProduct, setTopProduct] = useState([])

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      console.log(333333)
      try {
        const [categoriesResponse, productsResponse, topProductResponse] = await Promise.all([
          getAllCategory(),
          getAllProduct(),
          getTrendProduct()
        ]);
        console.log(44444444,topProductResponse.data[0])
        const productApprove = productsResponse.data.filter(
          (product) => product.status === 'APPROVED'
        );
       
        setCategories(categoriesResponse);

        setProducts(Array.isArray(productApprove) ? productApprove : []);
        setTopProduct(Array.isArray(topProductResponse.data) ? topProductResponse.data : [])
      } catch (error) {
        alert('Lỗi', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchInitialData();
  }, []);

  const trendProduct = topProduct.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    description: item.description,
    images: item.images,
    author: item.author.username,
    _count: item._count.RequestToBuy,
  }));
  const groupedProducts = categories.map((category) => ({
    ...category,
    products: products
      .filter((product) => Number(category.categoryId) === Number(product.categoryId))
      .map((product) => ({
        ...product,
        productId: Number(product.productId),
      })),
  }));

  return (
    <Box
      sx={{
        width: '80%',
        margin: '0 auto',
        paddingTop: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Typography sx={{ marginBottom: 2, fontSize: '15px' }}>MOR MARKET</Typography>
            <FeaturedProduct
               product={trendProduct[0]||{}}
               loading={loading}
            />
            <Divider sx={{ marginY: 2 }} />
          </div>
          {loading ? ( 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
          groupedProducts.map((category) => (
            <ProductList
              key={category.categoryId}
              category={category}
              products={category.products}
            />
          ))
        )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;