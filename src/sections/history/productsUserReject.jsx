import React from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  Typography,
  TableContainer,
} from '@mui/material';

const ProductsUserReject = ({ products, page, itemsPerPage, total, handlePageChange }) => (
  <>
    <h2>Sản phẩm đã bị người bán từ chối</h2>
    {products.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tên tài khoản</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.productId}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{product.product.name}</TableCell>
                <TableCell>${product.product.price}</TableCell>
                <TableCell>{product.product.author.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography variant="h6" align="center">
        Không có sản phẩm nào.
      </Typography>
    )}
    {products.length > 0 && (
      <Stack spacing={2}>
        <Pagination count={total} page={page} onChange={handlePageChange} />
      </Stack>
    )}
  </>
);

ProductsUserReject.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default ProductsUserReject;
