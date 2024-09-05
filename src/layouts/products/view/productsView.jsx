import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import { Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Table,
  Paper,
  Alert,
  Button,
  Dialog,
  Snackbar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  CircularProgress,
} from '@mui/material';

import { listPath, MESSAGES } from 'src/constant/constant';
import { deleteProduct, getListProduct } from 'src/api/product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const name = searchParams.get('name') || '';
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const limit = 4;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await getListProduct(page, limit, name);

      setProducts(productsData.data);
      setTotalPages(productsData.meta.total);
      if (productsData.data.length === 0) {
        setError(MESSAGES.ERROR_SEARCH_PRODUCT);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(MESSAGES.ERROR_GET_ALL_USER);
    } finally {
      setLoading(false);
    }
  }, [page, name]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDeleteProduct = async () => {
    setDeleting(true);
    try {
      const response = await deleteProduct(productToDelete);
      if (response) {
        setSnackbarMessage(MESSAGES.SUCCESS_DELETE_PRODUCT);
        setSearchParams({ page: 1 });
        setSnackbarSeverity('success');
        fetchProducts();
      } else {
        setSnackbarMessage(MESSAGES.ERROR_DELETE_PRODUCT);
        setSnackbarSeverity('error');
      }
    } catch (err) {
      setSnackbarMessage(MESSAGES.ERROR_DELETE_PRODUCT);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    setDialogOpen(false);
    setDeleting(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(listPath.adminDetailProduct(productId));
  };

  const openDialog = (productId) => {
    setProductToDelete(productId);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setProductToDelete(null);
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">Danh sách sản phẩm</Typography>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">STT</TableCell>
                <TableCell align="left">Ảnh</TableCell>
                <TableCell align="left">Tên sản phẩm</TableCell>
                <TableCell align="left">Người bán</TableCell>
                <TableCell align="left">Giá</TableCell>
                <TableCell align="left">Chi tiết</TableCell>
                <TableCell align="left">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.productId}>
                  <TableCell align="left">{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell align="left">
                    <img
                      src={JSON.parse(product.images)[0]}
                      alt={product.username}
                      style={{ width: 50, height: 50, borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.author.username}</TableCell>
                  <TableCell align="left">${product.price}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      Xem
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton color="secondary" onClick={() => openDialog(product.productId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {products.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
            count={Math.max(totalPages, 1)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="confirm-delete-dialog">
        <DialogTitle id="confirm-delete-dialog">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={closeDialog} color="primary" loading={deleting}>
            Hủy
          </LoadingButton>
          <LoadingButton onClick={handleDeleteProduct} color="secondary" loading={deleting}>
            Xóa
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
