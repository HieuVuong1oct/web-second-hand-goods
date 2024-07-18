import React from 'react';
import Cookies from 'js-cookie';

import { alpha, useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography } from '@mui/material';

import { bgGradient } from 'src/theme/css';

export const account = {
  displayName: Cookies.get('username'),
  email: Cookies.get('email'),
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};

export default function HomeView() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
        backgroundImage: 'url(/favicon/bg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, p: 3 }}>
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{ width: 120, height: 120, mb: 3 }}
        />
        <Typography variant="h4" sx={{ mb: 1, textAlign: 'center', color: 'white' }}>
          {account.displayName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center', color: 'white' }}>
          {account.email}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign: 'center', color: 'white' }}>
          Trang chủ
        </Typography>
      </Stack>
    </Box>
  );
}
