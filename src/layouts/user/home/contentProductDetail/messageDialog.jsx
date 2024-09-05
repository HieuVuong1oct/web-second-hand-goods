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
  <Dialog
  open={open}
  onClose={onClose}
  maxWidth="sm" 
  fullWidth 
  sx={{
    '& .MuiDialogTitle-root': {
      backgroundColor: '#1976d2', 
      color: '#fff', 
      padding: '16px', 
    },
    '& .MuiDialogContent-root': {
      padding: '24px', 
      backgroundColor: '#f5f5f5', 
    },
    '& .MuiDialogActions-root': {
      padding: '16px', 
      backgroundColor: '#f5f5f5', 
      justifyContent: 'center',
    },
    '& .MuiButton-root': {
      padding: '8px 24px', 
      fontSize: '16px', 
    },
  }}
>
  <DialogTitle>Lời nhắn</DialogTitle>
  <DialogContent>
    <Typography variant="body1">{message}</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose} color="primary" variant="contained">
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
