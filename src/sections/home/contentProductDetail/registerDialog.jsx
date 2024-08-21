
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React,{useState} from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const validationSchema = Yup.object({
  message: Yup.string()
  .trim('Lời nhắn không được bỏ trống')
  .required('Lời nhắn không được bỏ trống'),
  offer: Yup.number()
    .nullable()
    .positive('Giá mong muốn phải lớn hơn 0')
    .required('Giá mong muốn không được bỏ trống'),
});

const RegisterDialog = ({
  open,
  handleClose,
  handleRegisterBuy,
  loading,
}) => {
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const values = { message, offer };
  
    try {
      await validationSchema.validate(values, { abortEarly: false });
      handleRegisterBuy(values);
    } catch (err) {
      const fieldErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
    }
  };

  return (
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
          error={Boolean(errors.message)}
          helperText={errors.message}
        />
        <TextField
          margin="dense"
          label="Giá mong muốn"
          type="number"
          fullWidth
          variant="outlined"
          value={offer !== null ? offer : ''}
          onChange={(e) => setOffer(e.target.value === '' ? null : Number(e.target.value))}
          error={Boolean(errors.offer)}
          helperText={errors.offer}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          color="primary"
        >
          Đăng ký
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRegisterBuy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterDialog;