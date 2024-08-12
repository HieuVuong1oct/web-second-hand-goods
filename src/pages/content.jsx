import { Helmet } from 'react-helmet-async';

import ProductPage from 'src/sections/home/content/content'

export default function ContentPage() {
  return (
    <>
      <Helmet>
        <title> Content | Minimal UI </title>
      </Helmet>

      <ProductPage />
    </>
  );
}