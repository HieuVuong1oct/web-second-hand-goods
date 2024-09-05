import React from 'react';
import PropTypes from 'prop-types';

import { Box, Divider, Popover, MenuItem, Typography } from '@mui/material';

const UserMenu = ({
  anchorEl,
  handleClose,
  handleHistory,
  handleEdit,
  handleAddProduct,
  handleAdminPage,
  isAdmin,
  logOut,
  account,
  userId,
}) => (
  <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    sx={{ p: 0, mt: 1, ml: 0.75, width: 200 }}
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
    <MenuItem onClick={handleHistory}>Lịch sử</MenuItem>
    <Divider sx={{ borderStyle: 'dashed' }} />
    <MenuItem onClick={() => handleEdit(userId)}>Thông tin cá nhân</MenuItem>
    <Divider sx={{ borderStyle: 'dashed' }} />
    <MenuItem onClick={handleAddProduct}>Đăng bán</MenuItem>
    {isAdmin && (
      <>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleAdminPage}>Quản trị</MenuItem>
      </>
    )}
    <Divider sx={{ borderStyle: 'dashed' }} />
    <MenuItem onClick={logOut}>Đăng xuất</MenuItem>
  </Popover>
);

UserMenu.propTypes = {
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  handleHistory: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  handleAdminPage: PropTypes.func,
  isAdmin: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  account: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default UserMenu;
