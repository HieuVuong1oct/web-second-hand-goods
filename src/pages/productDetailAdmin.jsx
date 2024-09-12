import { Helmet } from 'react-helmet-async';

import ProductDetail from 'src/layouts/user/products/productDetail/productDetail';

export default function ProductDetailAdminPage() {
 
  return (
    <>
      <Helmet>
        <title> ProductDetail | Minimal UI </title>
      </Helmet>
      
      <ProductDetail />
    </>
  );
}
