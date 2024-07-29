import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

import { alpha } from '@mui/material/styles';
import { ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Avatar,
  AppBar,
  Button,
  Divider,
  Popover,
  MenuItem,
  InputBase,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import Account from 'src/_mock/account';
import { clearCookies } from 'src/cookie/setCookies';

import useStyles from './headerStyles';

const Header = () => {
  const account = Account();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const { navigateToLogin, navigateToSignUp } = useNavigationHelpers();

  const handleLoginClick = () => {
    navigateToLogin();
  };

  const handleRegisterClick = () => {
    navigateToSignUp();
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    clearCookies();
    navigateToLogin();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={classes.container}>
        {/* <div className={classes.item1}> */}

        {/* </div> */}
        <div className={classes.item2}>
          <div className={classes.logo}>
            <img src="/favicon/logo-1.png" alt="Logo" />
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
            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleOpen}
                  sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(anchorEl && {
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    }),
                  }}
                >
                  <Avatar
                    src={account.photoURL}
                    alt={account.displayName}
                    sx={{
                      width: 36,
                      height: 36,
                      border: (theme) => `solid 2px ${theme.palette.background.default}`,
                    }}
                  >
                    {account.displayName.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 0,
                      mt: 1,
                      ml: 0.75,
                      width: 200,
                    },
                  }}
                >
                  <Box sx={{ my: 1.5, px: 2 }}>
                    <Typography variant="subtitle2" noWrap>
                      {account.displayName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {account.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuItem
                    disableRipple
                    disableTouchRipple
                    onClick={logOut}
                    sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                  >
                    Đăng xuất
                  </MenuItem>
                </Popover>
              </>
            ) : (
              <div className={classes.loginButtons}>
                <Button
                  sx={{ color: '#9c27b0', ml: '20px' }}
                  className={classes.loginButton}
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </Button>
                <Button
                  sx={{ color: '#9c27b0' }}
                  className={classes.loginButton}
                  onClick={handleRegisterClick}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </Box>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
