import { Helmet } from 'react-helmet-async';

import ProductDetail from 'src/layouts/user/home/contentProductDetail/contentProductDetail';

export default function ProductDetailPage() {
  return (
    <>
      <Helmet>
        <title> ProductDetail | Minimal UI </title>
      </Helmet>

      <ProductDetail />
    </>
  );
}