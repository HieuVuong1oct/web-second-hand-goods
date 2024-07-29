import React, { useState } from 'react';

import {
  Box,
  Button,
  Select,
  MenuItem,
  Container,
  TextField,
  InputLabel,
  Typography,
  FormControl,

} from '@mui/material';

const AddProductView = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    cover: '',
    status: 'Selling',
    categoryId: '',
    userId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" gutterBottom>Thêm Sản Phẩm Mới</Typography>
        <TextField
          label="Tên sản phẩm"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Mô tả"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          label="Hình ảnh"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Giá"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Bìa"
          name="cover"
          value={product.cover}
          onChange={handleChange}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            name="status"
            value={product.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Selling">Đang bán</MenuItem>
            <MenuItem value="Sold">Đã bán</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="ID danh mục"
          name="categoryId"
          type="number"
          value={product.categoryId}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="ID người dùng"
          name="userId"
          type="number"
          value={product.userId}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">Thêm sản phẩm</Button>
      </Box>
    </Container>
  );
};

export default AddProductView;