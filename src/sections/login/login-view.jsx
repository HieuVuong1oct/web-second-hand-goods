// import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { login } from 'src/api/account';
import { bgGradient } from 'src/theme/css';
import { setCookies } from 'src/cookie/setCookies';

import Iconify from 'src/components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string()
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
      const response = await login(data);

      // const response = await axios.post('https://help-uu0q.onrender.com/api/auth/login', data);
      setLoading(false);
      console.log('Login response:', response);

      const userData = response;

      if (userData[0].userId) {
        setCookies(userData);

        if (userData[0].role === 'ADMIN') {
          router.push('/');
        } else if (userData[0].role === 'USER') {
          router.push('/homemain');
        } else {
          setError('Bạn không có quyền truy cập trang này.');
        }
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error details:', err);
      const errorMsg =
        err.response.data.message ||
        'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.';
      setError(errorMsg);
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
          // rules={{ required: 'Vui lòng nhập email' }}
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
      </Stack>
    </Box>
  );
}
