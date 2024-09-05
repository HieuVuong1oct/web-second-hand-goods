import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { addUser } from 'src/api/user';
import { listPath, MESSAGES } from 'src/constant/constant';

import Iconify from 'src/components/iconify';

export default function AddUserView() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
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
      .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
      .required('Vui lòng nhập mật khẩu'),
    checkPassword: Yup.string()
      .trim('Kiểm tra mật khẩu không được bỏ trống')
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
    username: Yup.string()
      .trim('Tên tài khoản không được bỏ trống')
      .min(1, 'Tên tài khoản phải có ít nhất 1 ký tự')
      .max(30, 'Tên tài khoản tối đa 30 ký tự')
      .required('Vui lòng nhập tên tài khoản'),
    name: Yup.string()
      .trim('Tên không được bỏ trống')
      .min(1, 'Tên phải có ít nhất 1 ký tự')
      .max(30, 'Tên tối đa 30 ký tự')
      .required('Vui lòng nhập tên người dùng'),
    avatar: Yup.mixed()
      .typeError('Bạn chưa tải ảnh')
      .required('Hình ảnh là bắt buộc')
      .test(
        'fileCount',
        'Bạn phải tải lên đúng 1 hình ảnh',
        (value) => value && value.length === 1
      ),
    role: Yup.string().required('Vui lòng chọn role'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { email, password, checkPassword, username, name, avatar, role } = data;
    const trimmedData = {
      email: email.trim(),
      password: password.trim(),
      checkPassword: checkPassword.trim(),
      username: username.trim(),
      name: name.trim(),
      avatar,
      role,
    };

    setLoading(true);
    if (trimmedData.password !== trimmedData.checkPassword) {
      setError(MESSAGES.ERROR_CHECKPASSWORD);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', trimmedData.email);
      formData.append('password', trimmedData.password);
      formData.append('username', trimmedData.username);
      formData.append('name', trimmedData.name);

      if (trimmedData.avatar && trimmedData.avatar.length > 0) {
        Array.from(trimmedData.avatar).forEach((file) => {
          formData.append('avatar', file);
        });
      }
      formData.append('role', trimmedData.role);
      const response = await addUser(formData);

      setLoading(false);
      if (response) {
        setSuccessMessage(MESSAGES.SUCCESS_ADD_USER);
        reset();
      } else {
        setError(MESSAGES.ERROR_ADD_USER);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_ADD_USER;
      setError(errorMsg);
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleUser = () => {
    navigate(listPath.USER);
  };

  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h5">
        Thêm mới người dùng
      </Typography>

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
                      sx={{ mt: 4 }}
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
                      sx={{ mt: 4 }}
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
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      sx={{ mt: 4 }}
                      {...field}
                      label="Chọn role"
                      error={!!errors.role}
                      helperText={errors.role ? errors.role.message : ''}
                      select
                      fullWidth
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </TextField>
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
                      sx={{ mt: 4, mb: 3 }}
                      {...field}
                      label="Nhập tên người dùng"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                      fullWidth
                    />
                  )}
                />
                <Typography variant="h7">Avatar</Typography>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => field.onChange(e.target.files)}
                        style={{ marginTop: '16px' }}
                      />
                      {errors.avatar && (
                        <Typography color="error" variant="caption">
                          {errors.avatar?.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
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
              Thêm mới
            </LoadingButton>
          </Card>
        </Stack>
      </form>
      <Typography sx={{ cursor: 'pointer', color: 'blue', mb: 2, mt: 2 }} onClick={handleUser}>
        Tới trang quản lý người dùng
      </Typography>
      {successMessage && (
        <Snackbar
          open={Boolean(successMessage)}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
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
          autoHideDuration={3000}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
