import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Button, Toolbar, Container } from '@mui/material';

import { listPath } from 'src/constant/constant';

import useStyles from './navbarStyles';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate(listPath.homePage);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.navbar}
      sx={{ backgroundColor: '#ADD8E6', mt: '88px' }}
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
          <Button
            color="inherit"
            className={classes.button}
            sx={{ color: '#8080C5', fontSize: '25px' }}
            onClick={handleHomePage}
          >
            MOR MARKET
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
