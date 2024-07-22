import { Helmet } from 'react-helmet-async';

import { ProductDetailView } from 'src/sections/products/productDetail';

export default function ProductDetailPage() {
  return (
    <>
      <Helmet>
        <title> ProductDetail | Minimal UI </title>
      </Helmet>

      <ProductDetailView />
    </>
  );
}