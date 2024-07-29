import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Button, Toolbar, Container } from '@mui/material';

import { listPath } from 'src/routes/constant'

import useStyles from './navbarStyles';


const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(listPath.addProduct);
  };

  const handleHomePage = () => {
    navigate(listPath.homePage);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.navbar}
      sx={{ backgroundColor: '#fce4ec', mt: '88px' }}
    >
      <Toolbar>
        <Container
          className={classes.container}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }} onClick={handleHomePage}>
            TRANG CHỦ
          </Button>
          <span className={classes.separator}>|</span>
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }}>
            HỒ SƠ
          </Button>
          <span className={classes.separator}>|</span>
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }} onClick={handleAddProduct}>
            ĐĂNG BÁN
          </Button>
          <span className={classes.separator}>|</span>
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }}>
            QUẢN LÝ ĐƠN HÀNG
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
