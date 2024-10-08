import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useNavigationHelpers } from 'src/routes/navigate/navigateHelper';

import { signUp } from 'src/api/account';
import { MESSAGES } from 'src/constant/constant';

import Iconify from 'src/components/iconify';

export default function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const { navigateToLogin } = useNavigationHelpers();
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Địa chỉ email không hợp lệ')
      .min(11, 'Email phải có ít nhất 11 ký tự')
      .max(64, 'Email tối đa 64 ký tự')
      .required('Vui lòng nhập email'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
      .required('Vui lòng nhập mật khẩu'),
    checkPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
    username: Yup.string()
      .min(1, 'Tên tài khoản phải có ít nhất 1 ký tự')
      .max(30, 'Tên tài khoản tối đa 30 ký tự')
      .required('Vui lòng nhập tên tài khoản'),
    name: Yup.string()
      .min(1, 'Tên phải có ít nhất 1 ký tự')
      .max(30, 'Tên tối đa 30 ký tự')
      .required('Vui lòng nhập tên người dùng'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { email, password, checkPassword, username, name } = data;
    setLoading(true);
    if (password !== checkPassword) {
      setError(MESSAGES.ERROR_CHECKPASSWORD);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('username', username);
      formData.append('name', name);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await signUp(formData);

      setLoading(false);
      if (response) {
        setSignUpSuccess(true);
        setSuccessMessage(
          'Mở email để xác nhận tài khoản. Nếu không xác nhận tài khoản sẽ bị xóa sau 15 phút!'
        );
        setTimeout(() => {
          navigateToLogin();
        }, 5000);
      } else {
        setError(MESSAGES.ERROR_SIGN_UP_WRONG);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_SIGN_UP;
      setError(errorMsg);
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickLogin = () => {
    navigateToLogin();
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    setAvatarFile(file);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 820,
              mt: 10,
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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                      sx={{ mt: 2 }}
                      {...field}
                      label="Nhập mật khẩu"
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nhập tên tài khoản"
                      error={!!errors.username}
                      helperText={errors.username ? errors.username.message : ''}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      {...field}
                      label="Nhập tên người dùng"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                      fullWidth
                    />
                  )}
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  Tải lên avatar
                  <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                </Button>
                {avatarFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Đã chọn file: {avatarFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {signUpSuccess && (
              <Typography
                variant="body2"
                sx={{ color: 'success.main', mt: 1, textAlign: 'center' }}
              >
                Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
              </Typography>
            )}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              loading={loading}
              sx={{ mt: 3 }}
            >
              Đăng Ký
            </LoadingButton>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Hoặc
              </Typography>
            </Divider>

            <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center' }}>
              Bạn đã có tài khoản?
              <Link variant="subtitle2" onClick={handleClickLogin} sx={{ cursor: 'pointer' }}>
                {' '}
                Đăng Nhập
              </Link>
            </Typography>
          </Card>
        </Stack>
      </form>

      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar
          open={Boolean(error)}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
