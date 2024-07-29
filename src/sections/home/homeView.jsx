import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Checkbox, Typography, FormControlLabel } from '@mui/material';

import Header from 'src/sections/home/header';
import useStyles from 'src/sections/home/content/contentStyles';

import Footer from './footer';
import Navbar from './navbar/navbar';

export default function HomeMainView() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Navbar />

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
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}
