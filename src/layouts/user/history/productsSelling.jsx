import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Edit } from '@mui/icons-material';
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
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { listPath } from 'src/constant/constant';

const ProductsSelling = ({
  products,
  page,
  itemsPerPage,
  total,
  handleViewDetail,
  handlePageChange,
  status,
  tab,
  requestStatus,
}) => {
  const navigate = useNavigate();

  const handleEditProduct = (productId) => {
    navigate(listPath.EDIT_PRODUCT_USER(productId));
  };

  return (
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
                <TableCell>Hành động</TableCell>
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
                  <TableCell align="left">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditProduct(product.productId)}
                    >
                      <Edit />
                    </IconButton>
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
};
ProductsSelling.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  total: PropTypes.number,
  status: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  requestStatus: PropTypes.string.isRequired,
};

export default ProductsSelling;
