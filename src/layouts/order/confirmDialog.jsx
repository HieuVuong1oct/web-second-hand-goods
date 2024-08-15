import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Xác nhận</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Bạn có chắc chắn muốn cho phép đăng bán sản phẩm này không?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Hủy
      </Button>
      <Button onClick={onConfirm} color="secondary">
        Xác nhận
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
export default ConfirmDialog;
