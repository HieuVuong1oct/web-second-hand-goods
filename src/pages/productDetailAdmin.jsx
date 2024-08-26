import { Helmet } from 'react-helmet-async';

import ProductDetail from 'src/sections/products/view/productDetail/productDetail';

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
