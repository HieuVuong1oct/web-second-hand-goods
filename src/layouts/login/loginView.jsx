import * as Yup from 'yup';
import { useState } from 'react';
import io from 'socket.io-client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import { login } from 'src/api/account';
import { setCookies } from 'src/cookie';
import { MESSAGES } from 'src/constant/constant';

import Iconify from 'src/components/iconify';

const socket = io(import.meta.env.VITE_SOCKET_URL);
export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { navigateToHome, navigateToAdmin, navigateToSignUp, navigateToForgotPassword } =
    useNavigationHelpers();
  const validationSchema = Yup.object({
    email: Yup.string()
    .trim('Email không được bỏ trống')
      .email('Địa chỉ email không hợp lệ')
      .min(11, 'Email phải có ít nhất 11 ký tự')
      .max(64, 'Email tối đa 64 ký tự')
      .required('Vui lòng nhập email'),
    password: Yup.string()
    .trim('Mật khẩu không được bỏ trống')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
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
      const trimmedData = {
        email: data.email.trim(),
        password: data.password.trim(),
      };
      const response = await login(trimmedData);
      setLoading(false);
      const userData = response;
      
      if (userData.data.user.userId) {
        setCookies(userData.data);

        setSuccess(true);
        socket.emit('login', (userData.data.user.userId));
        setTimeout(() => {
          if (userData.data.user.role === 'ADMIN') {
            navigateToAdmin();
          } else if (userData.data.user.role === 'USER') {
            navigateToHome();
          } else {
            setError(MESSAGES.ERROR_ACCESS);
          }
        }, 1000);
      } else {
        setError(MESSAGES.ERROR_LOGIN_WRONG);
      }
    } catch (err) {
      setLoading(false);

      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_LOGIN;

      setError(errorMsg);
    }
  };

  const clickSignUp = () => {
    navigateToSignUp();
  };

  const handleForgotPasswordClick = () => {
    navigateToForgotPassword();
  };

  const renderForm = (
    <>
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

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nhập mật khẩu"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: 'pointer' }}
          onClick={handleForgotPasswordClick}
        >
          Quên mật khẩu
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={loading}
      >
        Đăng nhập
      </LoadingButton>
    </>
  );

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

        <form onSubmit={handleSubmit(onSubmit)}>{renderForm}</form>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Hoặc
          </Typography>
        </Divider>

        <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center' }}>
          Bạn không có tài khoản?
          <Link onClick={clickSignUp} variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
            Đăng kí ngay
          </Link>
        </Typography>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Đăng nhập thành công
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
