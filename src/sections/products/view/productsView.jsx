
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';

import ProductCard from '../productCard';

export default function ProductsView() {

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hàng đang bán
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

     
    </Container>
  );
}
