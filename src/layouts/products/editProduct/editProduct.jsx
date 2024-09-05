import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Avatar, Container, CircularProgress } from '@mui/material';

import { listPath, MESSAGES } from 'src/constant/constant';
import { updateProduct, getProductById } from 'src/api/product';

const schema = Yup.object().shape({
  name: Yup.string()
    .trim('Tên sản phẩm không được bỏ trống')
    .min(1, 'Tên sản phẩm phải có ít nhất 1 ký tự')
    .max(30, 'Tên sản phẩm tối đa 30 ký tự')
    .required('Tên sản phẩm là bắt buộc'),
  description: Yup.string()
    .trim('Mô tả không được bỏ trống')
    .min(1, 'Mô tả phải có ít nhất 1 ký tự')
    .max(300, 'Mô tả tối đa 300 ký tự')
    .required('Mô tả là bắt buộc'),
  price: Yup.number()

    .typeError('Bạn chưa nhập giá')
    .required('Giá là bắt buộc')
    .positive('Giá phải là số lớn hơn 0'),
    images: Yup.mixed().test('fileCount', 'Bạn phải tải lên đúng 4 hình ảnh', (value) => {
      if (value && value.length > 0) {
        return value.length === 4;
      }
      return true; 
    }),
});

export default function EditProductView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();

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
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(productId);

        setValue('name', productData.data[0].name || '');
        setValue('description', productData.data[0].description || '');
        setValue('price', productData.data[0].price ? Number(productData.data[0].price) : 0);
        const imageUrls = JSON.parse(productData.data[0].images || '[]');

        setImagePreviews(imageUrls);
      } catch (err) {
        setError('Gặp lỗi khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));

      if (images.length > 0) {
        images.forEach((image) => formData.append('images', image));
      } else {
        formData.append('images', JSON.stringify(imagePreviews));
      }

      const response = await updateProduct(productId, formData);

      if (response) {
        setSuccessMessage(MESSAGES.SUCCESS_UPDATE_PRODUCT);
        reset({
          name: response.data.name || '',
          description: response.data.description || '',
          price: response.data.price || '',
        });

        setImagePreviews(JSON.parse(response.data.images || '[]'));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setError(MESSAGES.ERROR_UPDATE_PRODUCT);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || MESSAGES.ERROR_UPDATE_PRODUCT;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const handleProduct = () => {
    navigate(listPath.HISTORY);
  };

  return (
    <>
      {loading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && (
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
                  Chỉnh sửa sản phẩm
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Tên sản phẩm"
                          {...field}
                          fullWidth
                          margin="normal"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />

                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Mô tả sản phẩm"
                          {...field}
                          fullWidth
                          margin="normal"
                          multiline
                          rows={4}
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="price"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          sx={{ mt: 2 }}
                          label="Giá"
                          type="number"
                          {...field}
                          fullWidth
                          error={!!errors.price}
                          helperText={errors.price?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                    <Controller
                      name="images"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                            {imagePreviews.map((preview, index) => (
                              <Avatar
                                key={index}
                                src={preview}
                                alt={`Image Preview ${index}`}
                                sx={{ width: 50, height: 50 }}
                              />
                            ))}
                            <Button variant="contained" component="label">
                              Thay ảnh
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  handleImagesChange(e);
                                  field.onChange(e.target.files);
                                }}
                              />
                            </Button>
                          </Stack>
                          {errors.images && (
                            <Typography color="error" variant="body2">
                              {errors.images.message}
                            </Typography>
                          )}
                        </>
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
                  Cập nhật
                </LoadingButton>
              </Card>
            </Stack>
          </form>
          <Typography
            sx={{ cursor: 'pointer', color: 'blue', mb: 2, mt: 2 }}
            onClick={handleProduct}
          >
            Quay lại
          </Typography>
        </Container>
      )}

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
