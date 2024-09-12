import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, Popover, MenuItem, Typography } from '@mui/material';

import { listPath } from 'src/constant/constant';

const Notifications = ({
  notificationAnchorEl,
  notifications,
  handleNotificationClose,
  handleViewComment,
  showMore,
  handleShowMore,
  total,
}) => {
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    if (notification.content.includes('đã tạo một sản phẩm')) {
      navigate(listPath.PRODUCT_DETAIL_ORDER(notification.productId));
    } else {
      handleViewComment(notification.notificationId, notification.productId);
    }
  };

  return (
    <Popover
      open={Boolean(notificationAnchorEl)}
      anchorEl={notificationAnchorEl}
      onClose={handleNotificationClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ p: 0, mt: 1, ml: 0.75, width: '500px' }}
    >
      <Box sx={{ p: 2, width: '100%' }}>
        <Typography sx={{ fontSize: '15px', width: '300px' }}>Thông báo</Typography>
        {notifications.length === 0 ? (
          <div>Không có thông báo</div>
        ) : (
          notifications.map((notification, index) => (
            <Box key={`${notification.notificationId}-${index}`}>
              <MenuItem
                onClick={() => handleNotificationClick(notification)} // Sử dụng hàm xử lý điều hướng
                sx={{
                  backgroundColor: notification.status ? 'white' : '#f0f0f0',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                {notification.content}
              </MenuItem>
              <Typography sx={{ fontSize: '10px', pl: 1 }}>{notification.createdAt}</Typography>
              <Divider sx={{ borderColor: '#f0f0f0', borderWidth: '0.1px', mb: 1, mt: 1 }} />
            </Box>
          ))
        )}
        {notifications.length > 0 && total > 1 && (
          <Button onClick={handleShowMore} fullWidth>
            {showMore ? 'Ẩn bớt' : 'Xem thêm'}
          </Button>
        )}
      </Box>
    </Popover>
  );
};
Notifications.propTypes = {
  notificationAnchorEl: PropTypes.object,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      notificationId: PropTypes.number,
      productId: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
  handleViewComment: PropTypes.func.isRequired,
  showMore: PropTypes.bool.isRequired,
  handleShowMore: PropTypes.func.isRequired,
  total: PropTypes.number,
};
export default Notifications;
