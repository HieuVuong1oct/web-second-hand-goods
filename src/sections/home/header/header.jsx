// Header.js
import React from 'react';

import { ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import {Box, AppBar, Button, InputBase, Typography, IconButton, InputAdornment,  } from '@mui/material';

import useStyles from './HeaderStyles'; 

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <div className={classes.container}>
        <div className={classes.item1}>
          <div className={classes.loginButtons}>
            <Button sx={{ color: '#9c27b0' }} className={classes.loginButton}>Đăng nhập</Button>
            <Button sx={{ color: '#9c27b0' }} className={classes.loginButton}>Đăng ký</Button>
          </div>
        </div>
        <div className={classes.item2}>
          <div className={classes.logo}>
            <Typography variant="h6">Logo</Typography>
          </div>
          <Box className={classes.searchContainer}>
            <div className={classes.search}>
              <InputBase
                placeholder="Tìm kiếm…"
                className={classes.searchInput}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                }
              />
            </div>
            <IconButton sx={{ color: '#9c27b0' }} className={classes.shoppingCartIcon}>
              <ShoppingCart />
            </IconButton>
          </Box>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
