// src/pages/ForgotPasswordView.js
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import {  verifyEmail,sendResetPasswordEmail, } from 'src/api/account';

export default function ForgotPasswordView() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {

      await verifyEmail(data.email);

      await sendResetPasswordEmail(data);
      
      setLoading(false);
      setMessage('Đã gửi email đặt lại mật khẩu, vui lòng kiểm tra email của bạn.');
      setError('');
    } catch (err) {
      setLoading(false);
      console.error('Error details:', err);
      const errorMsg = err.response?.data?.message || 'Đã xảy ra lỗi trong quá trình gửi email. Vui lòng thử lại sau.';
      setError(errorMsg);
      setMessage('');
    }
  };

  return (
    
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack direction="row" justifyContent="center" spacing={2} mb={5}>
            <Box sx={{ mb: 3 }}>
              <img
                src="/favicon/logo-mor.jpg"
                alt="Logo MOR"
                style={{ width: '160px', height: '56px' }}
              />
            </Box>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nhập email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              loading={loading}
              sx={{ mt: 3 }}
            >
              Gửi yêu cầu đặt lại mật khẩu
            </LoadingButton>
            {message && (
              <Typography variant="body2" sx={{ color: 'success.main', mt: 2 }}>
                {message}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" sx={{ color: 'error.main', mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
          <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center' }}>
            Bạn nhớ mật khẩu?
            <Link href="/login" variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
              Đăng nhập ngay
            </Link>
          </Typography>
        </Card>
      </Stack>
   
  );
}
