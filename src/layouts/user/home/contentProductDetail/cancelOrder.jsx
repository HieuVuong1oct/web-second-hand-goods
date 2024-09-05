import PropTypes from 'prop-types';
import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const ConfirmOrderDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      alert('Lỗi');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận</DialogTitle>
      <DialogContent>
        <DialogContentText>Bạn có chắc chắn muốn hủy đăng kí mua sản phẩm này?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={onClose} color="primary" loading={loading}>
          Hủy
        </LoadingButton>
        <LoadingButton onClick={handleConfirm} color="secondary" loading={loading}>
          Xác nhận
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
ConfirmOrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
export default ConfirmOrderDialog;
