import React from 'react';
import PropTypes from 'prop-types';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const RegisterDialog = ({
  open,
  handleClose,
  message,
  setMessage,
  offer,
  setOffer,
  handleRegisterBuy,
  loading,
}) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Đăng ký mua</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Lời nhắn"
        type="text"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Giá mong muốn"
        type="number"
        fullWidth
        variant="outlined"
        value={offer}
        onChange={(e) => setOffer(Number(e.target.value))}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Hủy
      </Button>
      <LoadingButton
        onClick={handleRegisterBuy}
        loading={loading}
        variant="contained"
        color="primary"
      >
        Đăng ký
      </LoadingButton>
    </DialogActions>
  </Dialog>
);

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  offer: PropTypes.number,
  setOffer: PropTypes.func.isRequired,
  handleRegisterBuy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterDialog;
