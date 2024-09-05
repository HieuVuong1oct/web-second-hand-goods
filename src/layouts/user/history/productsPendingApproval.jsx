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

const ProductsPendingApproval = ({
  products,
  page,
  itemsPerPage,
  total,
  handlePageChange,
  status,
  tab,
  requestStatus,
}) => (
  <>
    <h2>Sản phẩm đã gửi cho admin duyệt</h2>
    {products.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.productId}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
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

ProductsPendingApproval.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  total: PropTypes.number,
  status: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  requestStatus: PropTypes.string.isRequired,
};

export default ProductsPendingApproval;
