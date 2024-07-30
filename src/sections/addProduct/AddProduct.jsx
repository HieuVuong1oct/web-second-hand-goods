import React from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Grid,
  Button,
  Container,
  TextField,
  Typography,

} from '@mui/material';

import { addProduct } from 'src/api/product';

import Header from 'src/sections/home/header';
import Footer from 'src/sections/home/footer';
import Navbar from 'src/sections/home/navbar';

const schema = Yup.object().shape({
  name: Yup.string()
  .min(1,'Tên sản phẩm phải có ít nhất 1 ký tự')
  .max(30, 'Tên sản phẩm tối đa 30 ký tự')
  .required('Tên sản phẩm là bắt buộc'),
  description: Yup.string()
  .min(1,'Mô tả phải có ít nhất 1 ký tự')
  .max(300, 'Mô tả tối đa 300 ký tự')
  .required('Mô tả là bắt buộc'),
  image: Yup.string().url('Hãy nhập một URL hợp lệ').required('Hình ảnh là bắt buộc'),
  price: Yup.number().required('Giá là bắt buộc').positive('Giá phải là số dương'),
  cover: Yup.string().url('Hãy nhập một URL hợp lệ').required('Bìa là bắt buộc'),
  categoryId: Yup.number()
    .required('ID danh mục là bắt buộc')
    .positive('ID danh mục phải là số dương'),
  
});

const AddProductView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      price: '',
      cover: '',
      categoryId: '',
     
    },
  });
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await addProduct(data);
      console.log('Sản phẩm đã được thêm:', response);
   
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);

    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Container width="80%" sx={{ paddingTop: '160px' }}>
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
            Thêm Sản Phẩm Mới
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
                name="image"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Hình ảnh"
                    {...field}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  />
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
              <Controller
                name="cover"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Bìa"
                    {...field}
                    error={!!errors.cover}
                    helperText={errors.cover?.message}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  />
                )}
              />
          
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="ID danh mục"
                    type="number"
                    {...field}
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                    fullWidth
                    sx={{ marginTop: 1 }}
                  />
                )}
              />
            
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: '60%',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default AddProductView;
