import React from 'react';
import PropTypes from 'prop-types';

import { Button,Dialog,TextField, DialogTitle, DialogActions,DialogContent, DialogContentText,    } from '@mui/material';

const RejectDialog = ({ open, onClose, onReject, rejectReason, setRejectReason, selectedOrder }) => 
   (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lý do từ chối</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng nhập lý do từ chối đơn hàng của {selectedOrder?.username}:
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onReject} color="secondary">
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );

  RejectDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    rejectReason: PropTypes.string.isRequired,
    setRejectReason: PropTypes.func.isRequired,
    selectedOrder: PropTypes.object,
  };

export default RejectDialog;
