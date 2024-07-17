import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

  export default function SignUpView() {
    const theme = useTheme();

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

   const clickLogin = () => {
    router.push('/login');
   }

    const renderForm = (
      <>
        <Stack spacing={3}>
          <TextField name="email" label="Nhập email" />

          <TextField
            name="password"
            label="Nhập mật khẩu"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          
<TextField
            name="checkPassword"
            label="Xác nhận mật khẩu"
            type={showPassword ? 'text' : 'checkPassword'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={clickLogin}
          sx={{ mt : 3}}
        >
          Đăng Ký
        </LoadingButton>
      </>
    );

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


        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >

            
             <Stack direction="row" justifyContent="center" spacing={2} mb={5}>
          
             <Box sx={{  mb: 3, }}>
          <img
            src="/favicon/logo-mor.jpg"
            alt="Logo MOR"
            style={{ width: '160px', height: '56px' }}
          />
        </Box>
      </Stack >
    

          {renderForm}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Hoặc
            </Typography>
          </Divider>

          <Typography variant="body2" sx={{ mt: 2, mb: 5, textAlign:'center' }}>
              Bạn đã có tài khoản?
              <Link onClick={clickLogin} variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }}>
                Đăng nhập
              </Link>
            </Typography>

           

          
        </Card>
      </Stack>
    </Box>
  );
}
