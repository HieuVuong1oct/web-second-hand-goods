import { Helmet } from 'react-helmet-async';

import ProductDetailOrders from 'src/layouts/order/productDetailOrders/productDetailOrders'


export default function ProductDetailOrderPage() {
  return (
    <>
      <Helmet>
        <title> ProductDetail | Minimal UI </title>
      </Helmet>

      <ProductDetailOrders />
    </>
  );
}