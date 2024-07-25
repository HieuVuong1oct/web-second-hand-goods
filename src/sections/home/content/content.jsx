import React from 'react';

import {
  Box,
  Card,
  Grid,
  Checkbox,
  Typography,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { products } from 'src/_mock/products';

import useStyles from './ContentStyles';

const Content = () => {
    const classes = useStyles();
  
    return (
      <Box className={classes.container}>
        <Box className={classes.row}>
          <Box className={classes.item1}>
            <Typography variant="h6">Danh mục</Typography>
            <ul className={classes.menuList}>
              <li className={classes.menuItem}>Đồ điện tử</li>
              <li className={classes.menuItem}>Thời trang</li>
              <li className={classes.menuItem}>Đồ ăn</li>
            </ul>
            <Box className={classes.filterSection}>
              <Typography variant="h6">Bộ lọc</Typography>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Sắp xếp theo giá"
                className={classes.filterLabel}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Sắp xếp theo thời gian bán"
                className={classes.filterLabel}
              />
            </Box>
          </Box>
          <Box className={classes.item2}>
            <Grid container spacing={2} className={classes.productList}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
                  <Card className={classes.productCard}>
                    <CardContent className={classes.cardContent}>
                      <img src={product.cover} alt={product.name} className={classes.productImage} />
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2">{`$${product.price}`}</Typography>
                      {product.priceSale && (
                        <Typography variant="body2" color="textSecondary">
                          {`$${product.priceSale}`}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Content;