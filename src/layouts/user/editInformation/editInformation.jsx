import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Avatar, Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { setCookies } from 'src/cookie';
import { MESSAGES } from 'src/constant/constant';
import { updateUser, getUserById } from 'src/api/user';

import Iconify from 'src/components/iconify';

const schema = Yup.object().shape({
  name: Yup.string()
    .trim('Tên không được bỏ trống')
    .min(1, 'Tên phải có ít nhất 1 ký tự')
    .max(30, 'Tên tối đa 30 ký tự')
    .required('Vui lòng nhập tên người dùng'),
  email: Yup.string()
    .trim('Email không được bỏ trống')
    .email('Địa chỉ email không hợp lệ')
    .min(11, 'Email phải có ít nhất 11 ký tự')
    .max(64, 'Email tối đa 64 ký tự')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .trim('Mật khẩu không được bỏ trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
    .required('Vui lòng nhập mật khẩu'),
  username: Yup.string()
    .trim('Tên tài khoản không được bỏ trống')
    .min(1, 'Tên tài khoản phải có ít nhất 1 ký tự')
    .max(30, 'Tên tài khoản tối đa 30 ký tự')
    .required('Vui lòng nhập tên tài khoản'),
  role: Yup.string().required('Vai trò là bắt buộc'),
});

export default function EditInformationView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const { userId } = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setValue('name', userData.data.name || '');
        setValue('email', userData.data.email || '');
        setValue('username', userData.data.username || '');
        setValue('password', userData.data.password || '');
        setValue('role', userData.data.role || '');

        const avatarUrl = JSON.parse(userData.data.avatar || '[]');
        setAvatarPreview(avatarUrl[0] || '');
      } catch (err) {
        setError('Gặp lỗi khi lấy dữ liệu');
      }
    };

    fetchUser();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('username', data.username);
      formData.append('name', data.name);

      if (avatar) {
        formData.append('avatar', avatar);
      } else {
        formData.append('avatar', avatarPreview);
      }

      formData.append('role', data.role);

      const response = await updateUser(userId, formData);

      if (response) {
        setSuccessMessage(MESSAGES.SUCCESS_UPDATE_USER);
        reset({
          name: response.data.name || '',
          email: response.data.email || '',
          username: response.data.username || '',
          password: response.data.password || '',
          role: response.data.role || '',
        });
        setCookies({
          accessToken: Cookies.get('accessToken'),
          refreshToken: Cookies.get('refreshToken'),
          user: {
            userId,
            username: response.data.username,
            avatar: response.data.avatar,
            email: response.data.email,
            role: response.data.role,
          },
        });
        setAvatarPreview(response.data.avatar ? JSON.parse(response.data.avatar)[0] : '');
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      } else {
        setError(MESSAGES.ERROR_UPDATE_USER);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_UPDATE_USER;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container width="80%" sx={{ paddingTop: '10px', paddingBottom: '50px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: '100%',
                height: '100%',
                mt: 1,
              }}
            >
              <Typography sx={{ mb: 2 }} variant="h5">
                Thông tin của bạn
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        {...field}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        sx={{ mt: 4 }}
                        label="Mật khẩu được mã hóa"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={toggleShowPassword} edge="end">
                                <Iconify
                                  icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="username"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Tên tài khoản"
                        {...field}
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        sx={{ mt: 4, mb: 2 }}
                        label="Tên người dùng"
                        {...field}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />

                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                    <Avatar
                      src={avatarPreview}
                      alt="Avatar Preview"
                      sx={{ width: 50, height: 50 }}
                    />

                    <Button variant="contained" component="label">
                      Thay Avatar
                      <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                loading={loading}
                sx={{ mt: 3, width: '60%', mx: 'auto', display: 'block' }}
              >
                Cập nhật
              </LoadingButton>
            </Card>
          </Stack>
        </form>
      </Container>
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          onClose={() => setSuccessMessage('')}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
