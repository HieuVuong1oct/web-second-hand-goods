
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

const AuthLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          
        }),
        height: 1,
        backgroundImage: 'url(/favicon/bg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 , display: 'contents'}}>
        
     
          <Outlet />
        
      </Stack>
    </Box>
  );
}

export default AuthLayout;