
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { alpha } from '@mui/material/styles';
import {
  Box,
  Alert,
  Avatar,
  AppBar,
  Button,
  Divider,
  Popover,
  MenuItem,
  Snackbar,
  IconButton,
  Typography,
} from '@mui/material';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import Account from 'src/_mock/account';
import { logout } from 'src/api/account';
import { listPath } from 'src/constant/constant';
import { clearCookies } from 'src/cookie/setCookies';

import useStyles from './headerStyles';

const Header = () => {
  const account = Account();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const role = Cookies.get('role');

    if (token) {
      setIsLoggedIn(true);
    }

    if (role === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  const { navigateToLogin, navigateToSignUp } = useNavigationHelpers();

  const handleAdminPage = () => {
    navigate(listPath.admin);
  };

  const handleLoginClick = () => {
    navigateToLogin();
  };

  const handleRegisterClick = () => {
    navigateToSignUp();
  };

  const handleOpen = (event) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const logOut = async () => {
    try {
      await logout();
      setSuccess(true);
      setTimeout(() => {
        clearCookies();
        navigateToLogin();
      }, 3000);
    } catch (error) {
      setSuccess(false);
    } finally {
      setIsLoggedIn(false);
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddProduct = () => {
    navigate(listPath.addProduct);
    
  };

  const handleHomePage = () => {
    navigate(listPath.homePage);
  };

  const handleHistory = () => {
    navigate(listPath.history);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{
        background: scrolled ? 'white' : 'transparent',
        transition: 'background 0.3s ease',
      }}
    >
      <div className={classes.container}>
      
          <div
            className={classes.logo}
            role="button"
            aria-label="Logo"
            tabIndex={0}
            onClick={handleHomePage}
            onKeyDown={handleHomePage}
          >
            <img src="/favicon/image.webp" alt="Logo" style={{ cursor: 'pointer', width: '150px', height: '50px' }} />
          </div>
          <Box className={classes.searchContainer}>
            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleOpen}
                  sx={{
                    marginLeft: '200px',
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
                    src={account.photoURL[0]}
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
                  sx={{
                    p: 0,
                    mt: 1,
                    ml: 0.75,
                    width: 200,
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
                    sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                    onClick={handleHistory}
                  >
                    Lịch sử
                  </MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuItem
                    disableRipple
                    disableTouchRipple
                    onClick={handleAddProduct}
                    sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                  >
                    Đăng bán
                  </MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {isAdmin && (
                    <>
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      <MenuItem
                        disableRipple
                        disableTouchRipple
                        onClick={handleAdminPage}
                        sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                      >
                        Quản trị
                      </MenuItem>
                    </>
                  )}
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
                  sx={{ ml: '20px' }}
                  className={classes.loginButton}
                  onClick={handleLoginClick}
                >
                  Đăng nhập
                </Button>
                <Button
                  className={classes.loginButton}
                  onClick={handleRegisterClick}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </Box>
       
      </div>

      <Snackbar
        open={success !== null}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccess(null)}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success ? 'Bạn đã đăng xuất thành công!' : 'Đăng xuất không thành công.'}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;