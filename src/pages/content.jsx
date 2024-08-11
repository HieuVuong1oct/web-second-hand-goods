import { Helmet } from 'react-helmet-async';

import ProductPage from 'src/sections/home/content/content'

export default function ContentPage() {
  return (
    <>
      <Helmet>
        <title> ContentProductDetailView | Minimal UI </title>
      </Helmet>

      <ProductPage />
    </>
  );
}