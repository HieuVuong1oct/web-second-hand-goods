import React from 'react';

import { AppBar, Button, Toolbar, Container } from '@mui/material';

import useStyles from './NavbarStyles';

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.navbar}
      sx={{ backgroundColor: '#fce4ec', mt: '88px' }}
    >
      <Toolbar>
        <Container
          className={classes.contanier}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }}>
            TRANG CHỦ
          </Button>
          <span className={classes.separator}>|</span>
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }}>
            HỒ SƠ
          </Button>
          <span className={classes.separator}>|</span>
          <Button color="inherit" className={classes.button} sx={{ color: '#9c27b0' }}>
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
