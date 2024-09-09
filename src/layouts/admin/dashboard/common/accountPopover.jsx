import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Badge } from '@mui/material';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import Account from 'src/_mock/account';
import { logout } from 'src/api/account';
import { clearCookies } from 'src/cookie';
import { getAllNotification } from 'src/api/user';
import Notifications from 'src/layouts/user/home/header/notification';

const socket = io('http://localhost:3000');

export default function AccountPopover() {
  const account = Account();
  const [open, setOpen] = useState(null);
  const [success, setSuccess] = useState(null);
  const { navigateToHome, navigateToLogin } = useNavigationHelpers();
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
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
  const handleClose = () => {
    setOpen(null);
  };

  const handleHome = () => {
    setOpen(null);
    navigateToHome();
  };

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
    }
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    fetchNotification();
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
    setNotificationCount(0);
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
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
      <Notifications
        notificationAnchorEl={notificationAnchorEl}
        notifications={notifications}
        handleNotificationClose={handleNotificationClose}
        handleViewComment={(notificationId, productId) => navigate(`/product/${productId}`)}
        showMore={showMore}
        handleShowMore={handleShowMore}
        total={total}
      />
      <Popover
        open={!!open}
        anchorEl={open}
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
          onClick={handleHome}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Tới trang chủ
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Đăng xuất
        </MenuItem>
      </Popover>

      <Snackbar
        open={success === true}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          Bạn đã đăng xuất thành công!
        </Alert>
      </Snackbar>

      <Snackbar
        open={success === false}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="error" sx={{ width: '100%' }}>
          Đăng xuất không thành công.
        </Alert>
      </Snackbar>
    </>
  );
}
