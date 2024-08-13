import React from 'react';
import PropTypes from 'prop-types';

import { Stack,Table, Paper, TableRow,TableBody, TableCell,TableHead,Pagination, TableContainer,  } from '@mui/material';

const ProductsSold = ({ productsSold, page, itemsPerPage, handlePageChange }) => (
    <>
     <h2>Sản phẩm đã bán</h2>
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
                {productsSold.map((product, index) => (
                  <TableRow key={product.productId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(productsSold.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
    </>
  );
  
  ProductsSold.propTypes = {
    productsSold: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };
  
  export default ProductsSold;