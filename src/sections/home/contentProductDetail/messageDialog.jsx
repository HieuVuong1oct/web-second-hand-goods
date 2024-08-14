import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const MessageDialog = ({ open, onClose, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Lời nhắn</DialogTitle>
    <DialogContent>
      <Typography variant="body1">{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Đóng
      </Button>
    </DialogActions>
  </Dialog>
);

MessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageDialog;
