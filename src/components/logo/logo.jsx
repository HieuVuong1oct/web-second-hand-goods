import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 160,
        height: 56,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
            src="/favicon/logo-mor.jpg"
            alt="Logo MOR"
            style={{ width: '160px', height: '56px' }}
          />
     
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
