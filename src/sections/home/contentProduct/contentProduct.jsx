import { useNavigate } from 'react-router-dom';

import { Box, Card, Grid, Button, Divider, Typography, CardContent } from '@mui/material';

import { products } from 'src/_mock/products';

import useStyles from './ContentProductStyles';

export default function ContentProductView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate('/homemain/contentProductDetail', { state: { product } });
  };

  const handleViewAllClick = () => {
    navigate('/homemain/listProduct');
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

      <h1 style={{ fontSize: '24px' }}>Đồ Thời Trang</h1>
      <Grid container spacing={2} className={classes.productList}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
            <Card className={classes.productCard} onClick={() => handleCardClick(product)}>
              <CardContent className={classes.cardContent}>
                <img src={product.cover} alt={product.name} className={classes.productImage} />
                <div className={classes.productInfo}>
                  <Typography variant="h6" className={classes.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product.price}</Typography>
                  {product.priceSale && (
                    <Typography variant="body2" color="textSecondary">
                      ${product.priceSale}
                    </Typography>
                  )}
                </div>
                <Button variant="contained" color="primary" className={classes.buyNowButton}>
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}>
        <Typography
          variant="contained"
          color="secondary"
          onClick={handleViewAllClick}
          sx={{ cursor: 'pointer' }}
        >
          Xem Thêm
        </Typography>
      </Box>
      <Divider />
      <h1 style={{ fontSize: '24px' }}>Đồ Điện Tử</h1>
      <Grid container spacing={2} className={classes.productList}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
            <Card className={classes.productCard} onClick={() => handleCardClick(product)}>
              <CardContent className={classes.cardContent}>
                <img src={product.cover} alt={product.name} className={classes.productImage} />
                <div className={classes.productInfo}>
                  <Typography variant="h6" className={classes.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product.price}</Typography>
                  {product.priceSale && (
                    <Typography variant="body2" color="textSecondary">
                      ${product.priceSale}
                    </Typography>
                  )}
                </div>
                <Button variant="contained" color="primary" className={classes.buyNowButton}>
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}>
        <Typography
          variant="contained"
          color="secondary"
          onClick={handleViewAllClick}
          sx={{ cursor: 'pointer' }}
        >
          Xem Thêm
        </Typography>
      </Box>
      <Divider />

      <h1 style={{ fontSize: '24px' }}>Đồ Ăn</h1>
      <Grid container spacing={2} className={classes.productList}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
            <Card className={classes.productCard} onClick={() => handleCardClick(product)}>
              <CardContent className={classes.cardContent}>
                <img src={product.cover} alt={product.name} className={classes.productImage} />
                <div className={classes.productInfo}>
                  <Typography variant="h6" className={classes.productName}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">${product.price}</Typography>
                  {product.priceSale && (
                    <Typography variant="body2" color="textSecondary">
                      ${product.priceSale}
                    </Typography>
                  )}
                </div>
                <Button variant="contained" color="primary" className={classes.buyNowButton}>
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}>
        <Typography
          variant="contained"
          color="secondary"
          onClick={handleViewAllClick}
          sx={{ cursor: 'pointer' }}
        >
          Xem Thêm
        </Typography>
      </Box>
    </>
  );
}
