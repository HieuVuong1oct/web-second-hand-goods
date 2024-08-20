import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Alert, Snackbar, Container, TextField, Typography } from '@mui/material';

import { addProduct } from 'src/api/product';
import { MESSAGES } from 'src/constant/constant';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Tên sản phẩm phải có ít nhất 1 ký tự')
    .max(30, 'Tên sản phẩm tối đa 30 ký tự')
    .required('Tên sản phẩm là bắt buộc'),
  description: Yup.string()
    .min(1, 'Mô tả phải có ít nhất 1 ký tự')
    .max(300, 'Mô tả tối đa 300 ký tự')
    .required('Mô tả là bắt buộc'),
  price: Yup.number()
    .typeError('Bạn chưa nhập giá')
    .required('Giá là bắt buộc')
    .positive('Giá phải là số lớn hơn 0'),
    images: Yup.mixed()
    .typeError('Bạn chưa tải ảnh')
    .required('Hình ảnh là bắt buộc')
    .test('fileCount', 'Bạn phải tải lên đúng 4 hình ảnh', (value) => 
         value && value.length === 4
    ),
});

const AddProductView = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      images: [],
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append('images', file);
        });
      }
      const response = await addProduct(formData);

      if (response) {
        setNotification({
          open: true,
          message: MESSAGES.SUCCESS_ADD_PRODUCT,
          severity: 'success',
        });
        setTimeout(() => {
          reset();
          setValue('images', []);
          document.querySelector('input[type="file"]').value = null;
        }, 1000);
      }
    } catch (error) {
      setNotification({ open: true, message: MESSAGES.ERROR_ADD_PRODUCT, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <Container width="80%" sx={{ paddingTop: '10px', paddingBottom: '50px' }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: '#fff',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Đăng bán sản phẩm
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Tên sản phẩm"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Mô tả"
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    fullWidth
                    multiline
                    rows={7}
                    sx={{ marginTop: 2 }}
                  />
                )}
              />

              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => field.onChange(e.target.files)}
                      style={{ marginTop: '16px' }}
                    />
                    {errors.images && (
                      <Typography color="error" variant="caption">
                        {errors.images?.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Giá"
                    type="number"
                    {...field}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
              sx={{
                width: '60%',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Đăng bán
            </LoadingButton>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductView;
