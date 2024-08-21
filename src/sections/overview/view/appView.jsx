import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import AppConversionRates from '../appConversionRates'

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Chào mừng trở lại 👋
      </Typography>

      <Grid xs={12} md={6} lg={8}>
        <AppConversionRates
          title="Top 3 sản phẩm nhiều người đăng kí nhất"
          subheader="(+43%) than last year"
          chart={{
            series: [
              { label: 'Italy', value: 400 },
              { label: 'Japan', value: 430 },
              { label: 'China', value: 448 },
           
            ],
          }}
        />
      </Grid>
    </Container>
  )
}
