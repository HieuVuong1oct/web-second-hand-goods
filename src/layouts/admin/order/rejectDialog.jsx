import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const validationSchema = Yup.object({
  rejectReason: Yup.string()
    .trim('Lý do từ chối không được bỏ trống')
    .required('Lý do từ chối không được bỏ trống'),
});

const RejectDialog = ({
  open,
  onClose,
  onReject,
  rejectReason,
  setRejectReason,
  selectedOrder,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReject = async () => {
    try {
      await validationSchema.validate({ rejectReason }, { abortEarly: false });
      setLoading(true);
      await onReject();
      setError('');
    } catch (err) {
      if (err.name === 'ValidationError') {
        setError(err.errors[0]);
      } else {
        alert('Lỗi');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lý do từ chối</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng nhập lý do từ chối đơn hàng của {selectedOrder?.author.username}:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Lý do"
          type="text"
          fullWidth
          variant="outlined"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={onClose} color="primary" loading={loading}>
          Hủy
        </LoadingButton>
        <LoadingButton onClick={handleReject} color="secondary" loading={loading}>
          Gửi
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

RejectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired,
  setRejectReason: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
};

export default RejectDialog;
