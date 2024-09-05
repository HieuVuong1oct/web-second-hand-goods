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

import { listStatus } from 'src/constant/constant';

const ProductsRejected = ({
  products,
  page,
  itemsPerPage,
  total,
  handleOpenRejectDialog,
  handlePageChange,
  status,
  tab,
  requestStatus,
}) => (
  <>
    <h2>Sản phẩm bị từ chối</h2>
    {products.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Lý do từ chối</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.productId}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  {product.status === listStatus.REJECTED ? (
                    <Typography
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleOpenRejectDialog(product.statusMessage)}
                    >
                      Xem lý do
                    </Typography>
                  ) : (
                    product.status
                  )}
                </TableCell>
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
        <Pagination
          count={total}
          page={page}
          onChange={(e, newPage) => handlePageChange(newPage, status, tab, requestStatus)}
        />
      </Stack>
    )}
  </>
);

ProductsRejected.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handleOpenRejectDialog: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  total: PropTypes.number,
  status: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  requestStatus: PropTypes.string.isRequired,
};

export default ProductsRejected;
