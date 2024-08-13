import React from 'react';
import PropTypes from 'prop-types';

import { Stack,Table, Paper, TableRow,TableBody, TableCell,TableHead,Pagination,Typography, TableContainer,  } from '@mui/material';

import { listStatus } from 'src/constant/constant';

const ProductsRejected = ({ products, page, itemsPerPage, handleOpenRejectDialog, handlePageChange }) => (
    <>
     <h2>Sản phẩm bị từ chối</h2>
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
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {product.status === listStatus.REJECT ? (
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
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
    </>
  );
  
  ProductsRejected.propTypes = {
    products: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    handleOpenRejectDialog: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };
  
  export default ProductsRejected;