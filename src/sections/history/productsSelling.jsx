import React from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Table,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  Typography,
  TableContainer,
} from '@mui/material';

const ProductsSelling = ({
  products,
  page,
  itemsPerPage,
  total,
  handleViewDetail,
  handlePageChange,
}) => (
  <>
    <h2>Sản phẩm đang bán</h2>
    {products.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.productId}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetail(product.productId, product.status)}
                  >
                    Xem
                  </Button>
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
        <Pagination count={total} page={page} onChange={handlePageChange} />
      </Stack>
    )}
  </>
);

ProductsSelling.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  total: PropTypes.number,
};

export default ProductsSelling;
