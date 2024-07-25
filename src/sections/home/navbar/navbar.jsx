import React from 'react';

import { AppBar, Button, Toolbar, Container, } from '@mui/material';

import useStyles from './NavbarStyles';

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static"  className={classes.navbar}>
      <Toolbar>
        <Container>
          <Button color="inherit" className={classes.button}>
            TRANG CHỦ
          </Button>
          <Button color="inherit" className={classes.button}>
            HỒ SƠ
          </Button>
          <Button color="inherit" className={classes.button}>
            ĐĂNG BÁN
          </Button>
          <Button color="inherit" className={classes.button}>
            QUẢN LÝ ĐƠN HÀNG
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
