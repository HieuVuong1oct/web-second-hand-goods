import React from 'react';

import { Box,  Grid, Card, Button, Typography, CardContent } from '@mui/material';

import useStyles from './ContentStyles';

const Content = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.item1}>
        <Typography variant="h6">Menu</Typography>
        {/* Nội dung menu */}
      </Box>
      <Box className={classes.item2}>
        <Box className={classes.sortBar}>
          <Button className={classes.sortButton}>Sắp xếp theo giá</Button>
          <Button className={classes.sortButton}>Sắp xếp theo thời gian bán</Button>
        </Box>
        <Grid container spacing={2} className={classes.productList}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card className={classes.productCard}>
                <CardContent>
                  <Typography variant="h6">Sản phẩm {index + 1}</Typography>
                  {/* Nội dung sản phẩm */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Content;