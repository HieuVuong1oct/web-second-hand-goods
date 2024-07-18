import axios from 'axios';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SignUpView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);

    if (formData.password !== formData.checkPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('https://mor-marketplace.onrender.com/api/auth/signup', {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        name: formData.name,
        avatar: formData.avatar,
      });

      setLoading(false);
      console.log(data);
      if (data) {
        setSignupSuccess(true);
        router.push('/login');
      } else {
        setError('Đăng ký không thành công. Vui lòng thử lại.');
      }
    } catch (err) {
      setLoading(false);
      setError('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
        backgroundImage: 'url(/favicon/bg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
                  rules={{ required: 'Vui lòng nhập email' }}
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
                  rules={{ required: 'Vui lòng nhập mật khẩu' }}
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
                  rules={{ required: 'Vui lòng xác nhận mật khẩu' }}
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
                  rules={{ required: 'Vui lòng nhập tên tài khoản' }}
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
                  rules={{ required: 'Vui lòng nhập tên người dùng' }}
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
                <Controller
                  name="avatar"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Vui lòng nhập avatar' }}
                  render={({ field }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      {...field}
                      label="Nhập avatar"
                      error={!!errors.avatar}
                      helperText={errors.avatar ? errors.avatar.message : ''}
                      fullWidth
                      />
                  )}
                />
              </Grid>
            </Grid>

            {error && (
              <Typography variant="body2" sx={{ color: 'error.main', mt: 1, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {signupSuccess && (
              <Typography variant="body2" sx={{ color: 'success.main', mt: 1, textAlign: 'center' }}>
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
              <Link
                onClick={handleClickLogin}
                variant="subtitle2"
                sx={{ ml: 0.5, cursor: 'pointer' }}
              >
                Đăng nhập
              </Link>
            </Typography>
          </Card>
        </Stack>
      </form>
    </Box>
  );
}