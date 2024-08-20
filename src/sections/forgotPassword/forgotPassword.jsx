import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import { MESSAGES } from 'src/constant/constant';
import { sendOtp, setPassword } from 'src/api/account';

import Iconify from 'src/components/iconify';

export default function ForgotPasswordView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const { navigateToLogin } = useNavigationHelpers();
  const validationSchema = Yup.object({
    email: Yup.string().trim('Email không được bỏ trống').email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
    otp: Yup.string().when('otpSent', {
      is: true,
      then: Yup.string().required('Vui lòng nhập OTP'),
    }),
    newPassword: Yup.string().when('otpSent', {
      is: true,
      then: Yup.string()
      .trim('Mật khẩu không được bỏ trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
        .required('Vui lòng nhập mật khẩu'),
    }),
    checkPassword: Yup.string().when('otpSent', {
      is: true,
      then: Yup.string()
      .trim('Kiểm tra mật khẩu không được bỏ trống')
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitOtp = async (data) => {
    const trimmedEmail = data.email.trim();
    setLoading(true);
    try {
      await sendOtp({ email: trimmedEmail.email });
      setOtpSent(true);
      setEmail(data.email);
      setLoading(false);
      setMessage(MESSAGES.SEND_EMAIL);
      setError('');
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_SEND_EMAIL;
      setError(errorMsg);
      setMessage('');
    }
  };

  const onSubmitNewPassword = async (data) => {
    const trimmedOtp = data.otp.trim(); 
    const trimmedNewPassword = data.newPassword.trim(); // Trim new password
    setLoading(true);
    try {
      await setPassword(email, trimmedOtp.otp, trimmedNewPassword.password);
      setTimeout(() => {
        navigateToLogin();
      }, 3000);
      setLoading(false);
      setMessage(MESSAGES.PASSWORD_RESET_SUCCESS);
      setError('');
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_RESET_PASSWORD;
      setError(errorMsg);
      setMessage('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setMessage('');
    setError('');
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
        <Stack direction="row" justifyContent="center" spacing={2} mb={5}>
          <Box sx={{ mb: 3 }}>
            <img
              src="/favicon/logo-mor.jpg"
              alt="Logo MOR"
              style={{ width: '160px', height: '56px' }}
            />
          </Box>
        </Stack>

        {!otpSent ? (
          <form onSubmit={handleSubmit(onSubmitOtp)}>
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
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={loading}
                sx={{ mt: 3 }}
              >
                Gửi OTP
              </LoadingButton>
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmitNewPassword)}>
            <Stack spacing={3}>
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nhập OTP"
                    error={!!errors.otp}
                    helperText={errors.otp ? errors.otp.message : ''}
                    fullWidth
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
                    label="Nhập mật khẩu mới"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword ? errors.newPassword.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="checkPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    sx={{ mt: 2 }}
                    {...field}
                    label="Xác nhận mật khẩu"
                    error={!!errors.checkPassword}
                    helperText={errors.checkPassword ? errors.checkPassword.message : ''}
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={loading}
                sx={{ mt: 3 }}
              >
                Tạo mật khẩu mới
              </LoadingButton>
            </Stack>
          </form>
        )}

        <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center' }}>
          Bạn nhớ mật khẩu?
          <Link href="/login" variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
            Đăng nhập ngay
          </Link>
        </Typography>
      </Card>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
