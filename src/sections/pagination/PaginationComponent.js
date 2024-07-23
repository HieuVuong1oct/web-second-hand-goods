import React from 'react';

import {  Box ,Pagination as MuiPagination} from '@mui/material';

const PaginationComponent = ({ count, page, onPageChange }) => {
  
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
      />
    </Box>
  
};

export default PaginationComponent;