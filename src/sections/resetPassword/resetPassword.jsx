import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { MESSAGES } from 'src/constant/constant'

export default function ResetPasswordView() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
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

      setLoading(false);
      setMessage(MESSAGES.SUCCESS_NEW_PASSWORD);
      setError('');
    } catch (err) {
      setLoading(false);

      const errorMsg =
        err.response?.data?.message || MESSAGES.ERROR_NEW_PASSWORD
       
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
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nhập mật khẩu mới"
                  type="password"
                  error={!!errors.newPassword}
                  helperText={errors.newPassword ? errors.newPassword.message : ''}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Xác nhận mật khẩu"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
            Đặt lại mật khẩu
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
      </Card>
    </Stack>
  );
}
