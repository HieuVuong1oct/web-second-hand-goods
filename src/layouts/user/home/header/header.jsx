import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { alpha } from '@mui/material/styles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, Badge, Alert, Avatar, AppBar, Snackbar, IconButton } from '@mui/material';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import Account from 'src/_mock/account';
import { logout } from 'src/api/account';
import { clearCookies } from 'src/cookie';
import { listPath } from 'src/constant/constant';
import { getAllNotification } from 'src/api/user';

import UserMenu from './userMenu';
import useStyles from './headerStyles';
import LoginButtons from './loginButton';
import Notifications from './notification';

const socket = io('http://localhost:3000');

const Header = () => {
  const account = Account();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const role = Cookies.get('role');

    setIsLoggedIn(!!token);
    setIsAdmin(role === 'ADMIN');
  }, []);

  const fetchNotification = useCallback(async (page = 1, append = false) => {
    try {
      setLoading(true);
      const response = await getAllNotification(page);
      setTotal(response.meta.total);
      if (append) {
        setNotifications((prevNotifications) => [...prevNotifications, ...response.data]);
      } else {
        setNotifications(response.data);
      }
    } catch (err) {
      alert('Lỗi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userId = Cookies.get('userId');

    socket.on(`notification ${userId}`, (data) => {
      const vnTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      setNotifications((prevNotifications) => [
        {
          createdAt: vnTime,
          content: `${data.message}`,
          productId: data.product.productId,
          status: false,
        },
        ...prevNotifications,
      ]);
      setNotificationCount((prevCount) => prevCount + 1);
    });

    if (userId) {
      fetchNotification();
    }

    return () => {
      socket.off(`notification ${userId}`);
    };
  }, [fetchNotification]);

  const { navigateToLogin, navigateToSignUp } = useNavigationHelpers();

  const handleAdminPage = () => {
    navigate(listPath.ADMIN);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    fetchNotification();
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

  const handleShowMore = () => {
    if (loading) return;
    if (total > 0 && showMore === false) {
      const nextPage = currentPage + 1;
      fetchNotification(nextPage, true);
      setCurrentPage(nextPage);
      if (nextPage === total) {
        setShowMore(!showMore);
      }
    } else {
      setCurrentPage(1);
      setShowMore(false);
      fetchNotification(1);
    }
  };

  const handleAddProduct = () => {
    navigate(listPath.ADD_PRODUCT);
  };

  const handleHomePage = () => {
    navigate(listPath.HOME_PAGE);
  };

  const handleHistory = () => {
    navigate(listPath.HISTORY);
  };

  const handleEdit = (Id) => {
    navigate(listPath.EDIT_INFORMATION(Id));
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
          <img
            src="/favicon/image.webp"
            alt="Logo"
            style={{ cursor: 'pointer', width: '150px', height: '50px' }}
          />
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
                    mr: 1,
                  }}
                >
                  {account.displayName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <IconButton
                onClick={handleNotificationClick}
                sx={{
                  marginLeft: '20px',
                }}
              >
                <Badge
                  badgeContent={notificationCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-dot': {
                      backgroundColor: (theme) => theme.palette.error.main,
                    },
                  }}
                >
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>

              <UserMenu
                anchorEl={anchorEl}
                handleClose={() => setAnchorEl(null)}
                handleHistory={handleHistory}
                handleEdit={handleEdit}
                handleAddProduct={handleAddProduct}
                handleAdminPage={handleAdminPage}
                isAdmin={isAdmin}
                logOut={logOut}
                account={account}
                userId={Cookies.get('userId')}
              />
            </>
          ) : (
            <LoginButtons
              handleLoginClick={navigateToLogin}
              handleRegisterClick={navigateToSignUp}
              classes={classes}
            />
          )}

          <Notifications
            notificationAnchorEl={notificationAnchorEl}
            notifications={notifications}
            handleNotificationClose={() => setNotificationAnchorEl(null)}
            handleViewComment={(notificationId, productId) => navigate(`/product/${productId}`)}
            showMore={showMore}
            handleShowMore={handleShowMore}
            total={total}
          />
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
