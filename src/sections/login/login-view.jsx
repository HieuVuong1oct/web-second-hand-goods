import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
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

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('https://mor-marketplace.onrender.com/api/auth/login', data);
      setLoading(false);
      const userData = response.data;

      if (userData[0].userId) {
        Cookies.set('accessToken', userData[1].accessToken, { expires: 7 });
        Cookies.set('refreshToken', userData[2].refreshToken, { expires: 7 });
        Cookies.set('userId', userData[0].userId, { expires: 7 });
        Cookies.set('username', userData[0].username, { expires: 7 });
        Cookies.set('avatar', userData[0].avatar, { expires: 7 });
        Cookies.set('email', userData[0].email, { expires: 7 });
        Cookies.set('role', userData[0].role, { expires: 7 });

        if (userData[0].role === 'Admin') {
          router.push('/');
        } else if (userData[0].role === 'User') {
          router.push('/homemain');
        } else {
          setError('Bạn không có quyền truy cập trang này.');
        }
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
      }
    } catch (err) {
      setLoading(false);
      setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.');
    }
  };

  const clickSignUp = () => {
    router.push('/signup');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
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
        <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }}>
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
      {error && (
        <Typography variant="body2" sx={{ color: 'error.main', mt: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );

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
            {renderForm}
          </form>
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
      </Stack>
    </Box>
  );
}
